import type { ShibaSwapV3ChainId } from "../../config/features/shibaswap-v3.js";
import type { PoolId } from "./pool-id.js";
import { ShibaSwapProtocol, type ShibaSwapV3Protocol } from "./protocol.js";

type Extension = {
  isProtocolFeeEnabled?: boolean;
  sqrtPrice: bigint;
  tick: bigint;
  observationIndex: bigint;
  feeGrowthGlobal0X128: bigint;
  feeGrowthGlobal1X128: bigint;
};

export type PoolV3<T extends PoolId = PoolId> = T &
  Omit<PoolId, "chainId" | "protocol"> & {
    chainId: ShibaSwapV3ChainId;
    protocol: ShibaSwapV3Protocol;
  } & Extension;

export function isPoolV3<T extends PoolV3>(pool: PoolId): pool is T {
  return pool.protocol === ShibaSwapProtocol.SHIBASWAP_V3;
}
