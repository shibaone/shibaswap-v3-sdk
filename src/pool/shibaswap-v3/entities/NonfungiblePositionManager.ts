import invariant from "tiny-invariant";
import { type Hex, encodeFunctionData, maxUint128 } from "viem";
import {
  nonfungiblePositionManagerAbi_burn,
  nonfungiblePositionManagerAbi_collect,
  nonfungiblePositionManagerAbi_createAndInitializePoolIfNecessary,
  nonfungiblePositionManagerAbi_decreaseLiquidity,
  nonfungiblePositionManagerAbi_increaseLiquidity,
  nonfungiblePositionManagerAbi_mint,
  nonfungiblePositionManagerAbi_safeTransferFrom,
} from "../../../abi/nonfungiblePositionManagerAbi/index.js";
import {
  type Currency,
  Amount as CurrencyAmount,
  type Native,
} from "../../../currency/index.js";
import type { BigintIsh, Percent } from "../../../math/index.js";
import type { MethodParameters } from "../utils/calldata.js";
import { validateAndParseAddress } from "../utils/index.js";
import { Multicall } from "./Multicall.js";
import { Position } from "./Position.js";
import { type PermitOptions, SelfPermit } from "./SelfPermit.js";
import type { ShibaSwapV3Pool } from "./ShibaSwapV3Pool.js";

export interface MintSpecificOptions {
  /**
   * The account that should receive the minted NFT.
   */
  recipient: string;

  /**
   * Creates pool if not initialized before mint.
   */
  createPool?: boolean;
}

export interface IncreaseSpecificOptions {
  /**
   * Indicates the ID of the position to increase liquidity for.
   */
  tokenId: BigintIsh;
}

/**
 * Options for producing the calldata to add liquidity.
 */
export interface CommonAddLiquidityOptions {
  /**
   * How much the pool price is allowed to move.
   */
  slippageTolerance: Percent;

  /**
   * When the transaction expires, in epoch seconds.
   */
  deadline: BigintIsh;

  /**
   * Whether to spend ether. If true, one of the pool tokens must be WETH, by default false
   */
  useNative?: Native;

  /**
   * The optional permit parameters for spending token0
   */
  token0Permit?: PermitOptions;

  /**
   * The optional permit parameters for spending token1
   */
  token1Permit?: PermitOptions;
}

export type MintOptions = CommonAddLiquidityOptions & MintSpecificOptions;
export type IncreaseOptions = CommonAddLiquidityOptions &
  IncreaseSpecificOptions;

export type AddLiquidityOptions = MintOptions | IncreaseOptions;

export interface SafeTransferOptions {
  /**
   * The account sending the NFT.
   */
  sender: string;

  /**
   * The account that should receive the NFT.
   */
  recipient: string;

  /**
   * The id of the token being sent.
   */
  tokenId: BigintIsh;
  /**
   * The optional parameter that passes data to the `onERC721Received` call for the staker
   */
  data?: Hex;
}

// type guard
function isMint(options: AddLiquidityOptions): options is MintOptions {
  return Object.keys(options).some((k) => k === "recipient");
}

export interface CollectOptions {
  /**
   * Indicates the ID of the position to collect for.
   */
  tokenId: BigintIsh;

  /**
   * Expected value of tokensOwed0, including as-of-yet-unaccounted-for fees/liquidity value to be burned
   */
  expectedCurrencyOwed0: CurrencyAmount<Currency>;

  /**
   * Expected value of tokensOwed1, including as-of-yet-unaccounted-for fees/liquidity value to be burned
   */
  expectedCurrencyOwed1: CurrencyAmount<Currency>;

  /**
   * The account that should receive the tokens.
   */
  recipient: string;
}

export interface NFTPermitOptions {
  v: 0 | 1 | 27 | 28;
  r: Hex;
  s: Hex;
  deadline: BigintIsh;
  spender: string;
}

/**
 * Options for producing the calldata to exit a position.
 */
export interface RemoveLiquidityOptions {
  /**
   * The ID of the token to exit
   */
  tokenId: BigintIsh;

  /**
   * The percentage of position liquidity to exit.
   */
  liquidityPercentage: Percent;

  /**
   * How much the pool price is allowed to move.
   */
  slippageTolerance: Percent;

  /**
   * When the transaction expires, in epoch seconds.
   */
  deadline: BigintIsh;

  /**
   * Whether the NFT should be burned if the entire position is being exited, by default false.
   */
  burnToken?: boolean;

  /**
   * The optional permit of the token ID being exited, in case the exit transaction is being sent by an account that does not own the NFT
   */
  permit?: NFTPermitOptions;

  /**
   * Parameters to be passed on to collect
   */
  collectOptions: Omit<CollectOptions, "tokenId">;
}

export abstract class NonfungiblePositionManager {
  /**
   * Cannot be constructed.
   */
  private constructor() {}

  private static encodeCreate(pool: ShibaSwapV3Pool): Hex {
    return encodeFunctionData({
      abi: nonfungiblePositionManagerAbi_createAndInitializePoolIfNecessary,
      functionName: "createAndInitializePoolIfNecessary",
      args: [
        pool.token0.address,
        pool.token1.address,
        pool.fee,
        pool.sqrtRatioX96,
      ],
    });
  }

  public static createCallParameters(pool: ShibaSwapV3Pool): MethodParameters {
    return {
      calldata: this.encodeCreate(pool),
      value: "0x00",
    };
  }

  public static addCallParameters(
    position: Position,
    options: AddLiquidityOptions
  ): MethodParameters {
    invariant(position.liquidity > 0n, "ZERO_LIQUIDITY");

    const calldatas: Hex[] = [];

    // get amounts
    const { amount0, amount1 } = position.mintAmountsWithSlippage(
      options.slippageTolerance
    );

    // adjust for slippage
    const amount0Min = amount0;
    const amount1Min = amount1;

    const deadline = BigInt(options.deadline);

    // create pool if needed
    if (isMint(options) && options.createPool) {
      calldatas.push(this.encodeCreate(position.pool));
    }

    // permits if necessary
    if (isMint(options)) {
      if (options.token0Permit) {
        calldatas.push(
          SelfPermit.encodePermit(position.pool.token0, options.token0Permit)
        );
      }
      if (options.token1Permit) {
        calldatas.push(
          SelfPermit.encodePermit(position.pool.token1, options.token1Permit)
        );
      }
    }

    // mint
    if (isMint(options)) {
      const recipient = validateAndParseAddress(options.recipient);

      calldatas.push(
        encodeFunctionData({
          abi: nonfungiblePositionManagerAbi_mint,
          functionName: "mint",
          args: [
            {
              token0: position.pool.token0.address,
              token1: position.pool.token1.address,
              fee: position.pool.fee,
              tickLower: position.tickLower,
              tickUpper: position.tickUpper,
              amount0Desired: amount0,
              amount1Desired: amount1,
              amount0Min,
              amount1Min,
              recipient,
              deadline,
            },
          ],
        })
      );
    } else {
      // increase
      calldatas.push(
        encodeFunctionData({
          abi: nonfungiblePositionManagerAbi_increaseLiquidity,
          functionName: "increaseLiquidity",
          args: [
            {
              tokenId: BigInt(options.tokenId),
              amount0Desired: amount0,
              amount1Desired: amount1,
              amount0Min,
              amount1Min,
              deadline,
            },
          ],
        })
      );
    }

    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: "0x00",
    };
  }

  private static encodeCollect(collectOptions: CollectOptions[]): Hex[] {
    return collectOptions.map((options) => {
      const recipient = validateAndParseAddress(options.recipient);
      const tokenId = BigInt(options.tokenId);
      const amount0Max = options.expectedCurrencyOwed0.quotient;
      const amount1Max = options.expectedCurrencyOwed1.quotient;

      return encodeFunctionData({
        abi: nonfungiblePositionManagerAbi_collect,
        functionName: "collect",
        args: [
          {
            tokenId,
            recipient,
            amount0Max,
            amount1Max,
          },
        ],
      });
    });
  }

  public static collectCallParameters(
    options: CollectOptions | CollectOptions[]
  ): MethodParameters {
    const collectOptions = Array.isArray(options) ? options : [options];
    const calldatas = this.encodeCollect(collectOptions);

    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: "0x00",
    };
  }

  /**
   * Produces the calldata for completely or partially exiting a position
   * @param position The position to exit
   * @param options Additional information necessary for generating the calldata
   * @returns The call parameters
   */
  public static removeCallParameters(
    position: Position,
    options: RemoveLiquidityOptions
  ): MethodParameters {
    const calldatas: Hex[] = [];

    const deadline = BigInt(options.deadline);
    const tokenId = BigInt(options.tokenId);

    // construct a partial position with a percentage of liquidity
    const partialPosition = new Position({
      pool: position.pool,
      liquidity:
        (position.liquidity * BigInt(options.liquidityPercentage.numerator)) /
        BigInt(options.liquidityPercentage.denominator),
      tickLower: position.tickLower,
      tickUpper: position.tickUpper,
    });

    invariant(partialPosition.liquidity > 0n, "ZERO_LIQUIDITY");

    // slippage-adjusted underlying amounts
    const { amount0: amount0Min, amount1: amount1Min } =
      partialPosition.burnAmountsWithSlippage(options.slippageTolerance);

    // remove liquidity
    calldatas.push(
      encodeFunctionData({
        abi: nonfungiblePositionManagerAbi_decreaseLiquidity,
        functionName: "decreaseLiquidity",
        args: [
          {
            tokenId,
            liquidity: partialPosition.liquidity,
            amount0Min,
            amount1Min,
            deadline,
          },
        ],
      })
    );

    // collect
    calldatas.push(
      encodeFunctionData({
        abi: nonfungiblePositionManagerAbi_collect,
        functionName: "collect",
        args: [
          {
            tokenId,
            recipient: validateAndParseAddress(
              options.collectOptions.recipient
            ),
            amount0Max: maxUint128,
            amount1Max: maxUint128,
          },
        ],
      })
    );

    // burn if necessary
    if (options.burnToken) {
      calldatas.push(
        encodeFunctionData({
          abi: nonfungiblePositionManagerAbi_burn,
          functionName: "burn",
          args: [tokenId],
        })
      );
    }

    return {
      calldata: Multicall.encodeMulticall(calldatas),
      value: "0x00",
    };
  }

  public static safeTransferFromParameters(
    options: SafeTransferOptions
  ): MethodParameters {
    const recipient = validateAndParseAddress(options.recipient);
    const sender = validateAndParseAddress(options.sender);

    return {
      calldata: encodeFunctionData({
        abi: nonfungiblePositionManagerAbi_safeTransferFrom,
        functionName: "safeTransferFrom",
        args: [
          sender,
          recipient,
          BigInt(options.tokenId),
          options.data ?? "0x",
        ],
      }),
      value: "0x00",
    };
  }
}
