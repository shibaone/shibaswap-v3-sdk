import invariant from "tiny-invariant";
import type { Address, Hex } from "viem";
import { encodePacked, keccak256 } from "viem/utils";
import { getCreate2Address } from "../../address/getCreate2Address.js";
import {
  SHIBASWAP_V2_INIT_CODE_HASH,
  type ShibaSwapV2ChainId,
} from "../../config/index.js";
import type { Token } from "../../currency/index.js";

/**
 * Computes a pair address
 * @param factoryAddress The Uniswap V2 factory address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param initCodeHashManualOverride Override the init code hash used to compute the pool address if necessary
 * @returns The pair address
 */
export const computeShibaSwapV2PoolAddress = ({
  factoryAddress,
  tokenA,
  tokenB,
  initCodeHashManualOverride,
}: {
  factoryAddress: Address;
  tokenA: Token;
  tokenB: Token;
  initCodeHashManualOverride?: Hex;
}): Address => {
  const [token0, token1] = tokenA.sortsBefore(tokenB)
    ? [tokenA, tokenB]
    : [tokenB, tokenA]; // does safety checks

  invariant(token0.chainId === token1.chainId, "CHAIN_ID");

  return getCreate2Address({
    from: factoryAddress,
    salt: keccak256(
      encodePacked(
        ["address", "address"],
        [token0.address, token1.address]
      ) as Hex
    ),
    bytecodeHash:
      initCodeHashManualOverride ??
      SHIBASWAP_V2_INIT_CODE_HASH[token0.chainId as ShibaSwapV2ChainId],
    chainId: token0.chainId,
  });
};
