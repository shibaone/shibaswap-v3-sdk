import type { Address } from "viem";
import { encodeAbiParameters, keccak256, parseAbiParameters } from "viem/utils";
import { getCreate2Address } from "../../../address/getCreate2Address.js";
import type { EvmChainId } from "../../../chain/evm/index.js";
import {
  SHIBASWAP_V3_INIT_CODE_HASH,
  type ShibaSwapV3ChainId,
  type ShibaSwapV3FeeAmount,
} from "../../../config/index.js";
import type { Token } from "../../../currency/index.js";

type ComputeShibaSwapV3PoolAddressParams = {
  factoryAddress: Address;
  fee: ShibaSwapV3FeeAmount;
  initCodeHashManualOverride?: Address | undefined;
} & (
  | {
      tokenA: Token;
      tokenB: Token;
    }
  | {
      tokenA: Address;
      tokenB: Address;
      chainId: EvmChainId;
    }
);

/**
 * Computes a pool address
 * @param factoryAddress The Uniswap V3 factory address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param fee The fee tier of the pool
 * @param initCodeHashManualOverride Override the init code hash used to compute the pool address if necessary
 * @returns The pool address
 */
export function computeShibaSwapV3PoolAddress(
  params: ComputeShibaSwapV3PoolAddressParams
): Address {
  if (typeof params.tokenA === "string" && typeof params.tokenB === "string") {
    // FIXME: We shouldn't even allow sending strings into here
    const {
      factoryAddress,
      tokenA,
      tokenB,
      fee,
      initCodeHashManualOverride,
      chainId,
    } = params;

    return getCreate2Address({
      from: factoryAddress,
      salt: keccak256(
        encodeAbiParameters(parseAbiParameters("address, address, uint24"), [
          tokenA,
          tokenB,
          fee,
        ])
      ),
      bytecodeHash:
        initCodeHashManualOverride ??
        SHIBASWAP_V3_INIT_CODE_HASH[chainId as ShibaSwapV3ChainId],
      chainId,
    });
  }

  const { factoryAddress, tokenA, tokenB, fee, initCodeHashManualOverride } =
    params;
  const [token0, token1] = tokenA.sortsBefore(tokenB)
    ? [tokenA, tokenB]
    : [tokenB, tokenA]; // does safety checks

  return getCreate2Address({
    from: factoryAddress,
    salt: keccak256(
      encodeAbiParameters(parseAbiParameters("address, address, uint24"), [
        token0.address,
        token1.address,
        fee,
      ])
    ),
    bytecodeHash:
      initCodeHashManualOverride ??
      SHIBASWAP_V3_INIT_CODE_HASH[token0.chainId as ShibaSwapV3ChainId],
    chainId: token0.chainId,
  });
}
