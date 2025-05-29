import type { EvmChainId } from "../../chain/evm/index.js";
import {
  SHIBASWAP_V2_SUPPORTED_CHAIN_IDS,
  SHIBASWAP_V3_SUPPORTED_CHAIN_IDS,
} from "../features/index.js";
import type { ShibaSwapV2ChainId } from "./shibaswap-v2.js";
import type { ShibaSwapV3ChainId } from "./shibaswap-v3.js";

export const SHIBASWAP_SUPPORTED_CHAIN_IDS = Array.from(
  new Set([
    ...SHIBASWAP_V2_SUPPORTED_CHAIN_IDS,
    ...SHIBASWAP_V3_SUPPORTED_CHAIN_IDS,
  ])
) as Readonly<(ShibaSwapV2ChainId | ShibaSwapV3ChainId)[]>;

export const ShibaSwapChainIds = SHIBASWAP_SUPPORTED_CHAIN_IDS;

export type ShibaSwapChainId = (typeof SHIBASWAP_SUPPORTED_CHAIN_IDS)[number];

export function isShibaSwapChainId(
  chainId: EvmChainId
): chainId is ShibaSwapChainId {
  return SHIBASWAP_SUPPORTED_CHAIN_IDS.includes(chainId as ShibaSwapChainId);
}
