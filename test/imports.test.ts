import { describe, it, expect } from "vitest";
import { ChainId } from "shibaswap-v3-sdk/chain";
import { erc20Abi_totalSupply } from "shibaswap-v3-sdk/abi";
import { getIdFromChainIdAddress } from "shibaswap-v3-sdk/format";
import type { PoolId } from "shibaswap-v3-sdk/types";

describe("Import tests", () => {
  it("should import from chain module", () => {
    expect(ChainId).toBeDefined();
  });

  it("should import from abi module", () => {
    expect(erc20Abi_totalSupply).toBeDefined();
  });

  it("should import from format module", () => {
    expect(getIdFromChainIdAddress).toBeDefined();
  });

  it("should import from types module", () => {
    const poolId: PoolId = "0x123";
    expect(poolId).toBeDefined();
  });
});
