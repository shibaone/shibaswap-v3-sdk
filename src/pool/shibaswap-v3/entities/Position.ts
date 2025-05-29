import invariant from "tiny-invariant";
import { type Price, type Token } from "../../../currency/index.js";
import { type BigintIsh, Percent } from "../../../math/index.js";
import { maxLiquidityForAmounts } from "../utils/maxLiquidityForAmounts.js";
import { tickToPrice } from "../utils/priceTickConversions.js";
import { SqrtPriceMath } from "../utils/sqrtPriceMath.js";
import { TickMath } from "../utils/tickMath.js";
import { ShibaSwapV3Pool } from "./ShibaSwapV3Pool.js";

interface PositionConstructorArgs {
  pool: ShibaSwapV3Pool;
  tickLower: number;
  tickUpper: number;
  liquidity: bigint;
}

/**
 * Represents a position on a Uniswap V3 Pool
 */
export class Position {
  public readonly pool: ShibaSwapV3Pool;
  public readonly tickLower: number;
  public readonly tickUpper: number;
  public readonly liquidity: bigint;

  // cached resuts for the getters
  private _mintAmounts: Readonly<{ amount0: bigint; amount1: bigint }> | null =
    null;
  private _amount0: bigint | null = null;
  private _amount1: bigint | null = null;

  /**
   * Constructs a position for a given pool with the given liquidity
   * @param pool For which pool the liquidity is assigned
   * @param liquidity The amount of liquidity that is in the position
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   */
  public constructor({
    pool,
    liquidity,
    tickLower,
    tickUpper,
  }: PositionConstructorArgs) {
    invariant(tickLower < tickUpper, "TICK_ORDER");
    invariant(tickLower >= -887272, "TICK_LOWER");
    invariant(tickUpper <= 887272, "TICK_UPPER");
    invariant(tickLower % pool.tickSpacing === 0, "TICK_LOWER");
    invariant(tickUpper % pool.tickSpacing === 0, "TICK_UPPER");

    this.pool = pool;
    this.tickLower = tickLower;
    this.tickUpper = tickUpper;
    this.liquidity = liquidity;
  }

  /**
   * Returns the price of token0 at the lower tick
   */
  public get token0PriceLower(): Price<Token, Token> {
    return tickToPrice(this.pool.token0, this.pool.token1, this.tickLower);
  }

  /**
   * Returns the price of token0 at the upper tick
   */
  public get token0PriceUpper(): Price<Token, Token> {
    return tickToPrice(this.pool.token0, this.pool.token1, this.tickUpper);
  }

  /**
   * Returns the amount of token0 that this position's liquidity could be burned for at the current pool price
   */
  public get amount0(): bigint {
    if (this._amount0 === null) {
      if (this.pool.tickCurrent < this.tickLower) {
        // all liquidity in token0
        this._amount0 = SqrtPriceMath.getAmount0Delta(
          TickMath.getSqrtRatioAtTick(this.tickLower),
          TickMath.getSqrtRatioAtTick(this.tickUpper),
          this.liquidity,
          false
        );
      } else if (this.pool.tickCurrent >= this.tickUpper) {
        // all liquidity in token1
        this._amount0 = 0n;
      } else {
        // in-range: split
        this._amount0 = SqrtPriceMath.getAmount0Delta(
          this.pool.sqrtRatioX96,
          TickMath.getSqrtRatioAtTick(this.tickUpper),
          this.liquidity,
          false
        );
      }
    }
    return this._amount0;
  }

  /**
   * Returns the amount of token1 that this position's liquidity could be burned for at the current pool price
   */
  public get amount1(): bigint {
    if (this._amount1 === null) {
      if (this.pool.tickCurrent < this.tickLower) {
        // all liquidity in token0
        this._amount1 = 0n;
      } else if (this.pool.tickCurrent >= this.tickUpper) {
        // all liquidity in token1
        this._amount1 = SqrtPriceMath.getAmount1Delta(
          TickMath.getSqrtRatioAtTick(this.tickLower),
          TickMath.getSqrtRatioAtTick(this.tickUpper),
          this.liquidity,
          false
        );
      } else {
        // in-range: split
        this._amount1 = SqrtPriceMath.getAmount1Delta(
          TickMath.getSqrtRatioAtTick(this.tickLower),
          this.pool.sqrtRatioX96,
          this.liquidity,
          false
        );
      }
    }
    return this._amount1;
  }

  /**
   * Returns the minimum amounts that must be sent in order to safely mint the amount of liquidity held by the position
   * with the given slippage tolerance
   * @param slippageTolerance Tolerance of unfavorable slippage from the current price
   * @returns The amounts, with slippage
   */
  public mintAmountsWithSlippage(
    slippageTolerance: Percent
  ): Readonly<{ amount0: bigint; amount1: bigint }> {
    const { amount0, amount1 } = this.mintAmounts;
    const slippageNumerator = BigInt(slippageTolerance.numerator);
    const slippageDenominator = BigInt(slippageTolerance.denominator);
    if (this.pool.tickCurrent < this.tickLower) {
      // only amount0 is non-zero
      const amount0Min =
        amount0 - (amount0 * slippageNumerator) / slippageDenominator;
      return { amount0: amount0Min, amount1: 0n };
    } else if (this.pool.tickCurrent >= this.tickUpper) {
      // only amount1 is non-zero
      const amount1Min =
        amount1 - (amount1 * slippageNumerator) / slippageDenominator;
      return { amount0: 0n, amount1: amount1Min };
    } else {
      // in-range: both non-zero
      const amount0Min =
        amount0 - (amount0 * slippageNumerator) / slippageDenominator;
      const amount1Min =
        amount1 - (amount1 * slippageNumerator) / slippageDenominator;
      return { amount0: amount0Min, amount1: amount1Min };
    }
  }

  /**
   * Returns the minimum amounts that should be requested in order to safely burn the amount of liquidity held by the
   * position with the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the current price
   * @returns The amounts, with slippage
   */
  public burnAmountsWithSlippage(
    slippageTolerance: Percent
  ): Readonly<{ amount0: bigint; amount1: bigint }> {
    const amount0 = this.amount0;
    const amount1 = this.amount1;
    const slippageNumerator = BigInt(slippageTolerance.numerator);
    const slippageDenominator = BigInt(slippageTolerance.denominator);
    if (this.pool.tickCurrent < this.tickLower) {
      // only amount0 is non-zero
      const amount0Min =
        amount0 - (amount0 * slippageNumerator) / slippageDenominator;
      return { amount0: amount0Min, amount1: 0n };
    } else if (this.pool.tickCurrent >= this.tickUpper) {
      // only amount1 is non-zero
      const amount1Min =
        amount1 - (amount1 * slippageNumerator) / slippageDenominator;
      return { amount0: 0n, amount1: amount1Min };
    } else {
      // in-range: both non-zero
      const amount0Min =
        amount0 - (amount0 * slippageNumerator) / slippageDenominator;
      const amount1Min =
        amount1 - (amount1 * slippageNumerator) / slippageDenominator;
      return { amount0: amount0Min, amount1: amount1Min };
    }
  }

  /**
   * Returns the minimum amounts that must be sent in order to mint the amount of liquidity held by the position at
   * the current price for the pool
   */
  public get mintAmounts(): Readonly<{ amount0: bigint; amount1: bigint }> {
    if (this._mintAmounts === null) {
      if (this.pool.tickCurrent < this.tickLower) {
        this._mintAmounts = {
          amount0: SqrtPriceMath.getAmount0Delta(
            TickMath.getSqrtRatioAtTick(this.tickLower),
            TickMath.getSqrtRatioAtTick(this.tickUpper),
            this.liquidity,
            true
          ),
          amount1: 0n,
        };
      } else if (this.pool.tickCurrent >= this.tickUpper) {
        this._mintAmounts = {
          amount0: 0n,
          amount1: SqrtPriceMath.getAmount1Delta(
            TickMath.getSqrtRatioAtTick(this.tickLower),
            TickMath.getSqrtRatioAtTick(this.tickUpper),
            this.liquidity,
            true
          ),
        };
      } else {
        this._mintAmounts = {
          amount0: SqrtPriceMath.getAmount0Delta(
            this.pool.sqrtRatioX96,
            TickMath.getSqrtRatioAtTick(this.tickUpper),
            this.liquidity,
            true
          ),
          amount1: SqrtPriceMath.getAmount1Delta(
            TickMath.getSqrtRatioAtTick(this.tickLower),
            this.pool.sqrtRatioX96,
            this.liquidity,
            true
          ),
        };
      }
    }
    return this._mintAmounts;
  }

  /**
   * @param tokenA The first token
   * @param tokenB The second token
   * @param fee The fee tier of the pool
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   * @param amount0 The amount of token0
   * @param amount1 The amount of token1
   * @param useFullPrecision If false, liquidity will be maximized according to what the router can calculate,
   * not what core can theoretically support
   */
  public static fromAmounts({
    pool,
    tickLower,
    tickUpper,
    amount0,
    amount1,
    useFullPrecision,
  }: {
    pool: ShibaSwapV3Pool;
    tickLower: number;
    tickUpper: number;
    amount0: BigintIsh;
    amount1: BigintIsh;
    useFullPrecision: boolean;
  }) {
    const sqrtRatioAX96 = TickMath.getSqrtRatioAtTick(tickLower);
    const sqrtRatioBX96 = TickMath.getSqrtRatioAtTick(tickUpper);

    return new Position({
      pool,
      tickLower,
      tickUpper,
      liquidity: maxLiquidityForAmounts(
        pool.sqrtRatioX96,
        sqrtRatioAX96,
        sqrtRatioBX96,
        amount0,
        amount1,
        useFullPrecision
      ),
    });
  }

  /**
   * @param tokenA The first token
   * @param tokenB The second token
   * @param fee The fee tier of the pool
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   * @param amount0 The amount of token0
   * @param useFullPrecision If false, liquidity will be maximized according to what the router can calculate,
   * not what core can theoretically support
   */
  public static fromAmount0({
    pool,
    tickLower,
    tickUpper,
    amount0,
    useFullPrecision,
  }: {
    pool: ShibaSwapV3Pool;
    tickLower: number;
    tickUpper: number;
    amount0: BigintIsh;
    useFullPrecision: boolean;
  }) {
    return Position.fromAmounts({
      pool,
      tickLower,
      tickUpper,
      amount0,
      amount1: 0n,
      useFullPrecision,
    });
  }

  /**
   * @param tokenA The first token
   * @param tokenB The second token
   * @param fee The fee tier of the pool
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   * @param amount1 The amount of token1
   */
  public static fromAmount1({
    pool,
    tickLower,
    tickUpper,
    amount1,
  }: {
    pool: ShibaSwapV3Pool;
    tickLower: number;
    tickUpper: number;
    amount1: BigintIsh;
  }) {
    return Position.fromAmounts({
      pool,
      tickLower,
      tickUpper,
      amount0: 0n,
      amount1,
      useFullPrecision: true,
    });
  }
}
