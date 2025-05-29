import type { ShibaSwapV2ChainId } from "../../config/features/shibaswap-v2.js";
import type { PoolId } from "./pool-id.js";
import { ShibaSwapProtocol, type ShibaSwapV2Protocol } from "./protocol.js";

export type PoolV2<T extends PoolId = PoolId> = T &
  Omit<PoolId, "chainId" | "protocol"> & {
    chainId: ShibaSwapV2ChainId;
    protocol: ShibaSwapV2Protocol;
  };

export function isPoolV2<T extends PoolV2>(pool: PoolId): pool is T {
  return pool.protocol === ShibaSwapProtocol.SHIBASWAP_V2;
}
