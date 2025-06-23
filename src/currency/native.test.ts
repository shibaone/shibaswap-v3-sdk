import { describe, expect, it } from "vitest";

import { EvmChainId } from "../chain/index.js";
import { Native } from "./native.js";
import { Token } from "./token.js";

describe("Currency", () => {
  const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
  const ADDRESS_ONE = "0x0000000000000000000000000000000000000001";

  const t0 = new Token({ chainId: 1, address: ADDRESS_ZERO, decimals: 18 });
  const t1 = new Token({ chainId: 1, address: ADDRESS_ONE, decimals: 18 });

  describe("#equals", () => {
    it("ether on same chains is ether", () => {
      expect(Native.onChain(1).equals(Native.onChain(1)));
    });
    it("ether is not token0", () => {
      expect(Native.onChain(1).equals(t0)).toStrictEqual(false);
    });
    it("token1 is not token0", () => {
      expect(t1.equals(t0)).toStrictEqual(false);
    });
    it("token0 is token0", () => {
      expect(t0.equals(t0)).toStrictEqual(true);
    });
    it("token0 is equal to another token0", () => {
      expect(
        t0.equals(
          new Token({
            chainId: 1,
            address: ADDRESS_ZERO,
            decimals: 18,
            symbol: "symbol",
            name: "name",
          })
        )
      ).toStrictEqual(true);
    });
    it("throws if chain id is not known", () => {
      expect(() =>
        Native.onChain(Number.MAX_SAFE_INTEGER as EvmChainId)
      ).toThrow("NATIVE_CURRENCY");
    });
  });
});

describe("Native token address", () => {
  const BONE_ADDRESS = "0x0000000000000000000000000000000000001010";
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  const ALL_CHAIN_IDS = [
    EvmChainId.ETHEREUM,
    EvmChainId.GÖRLI,
    EvmChainId.OPTIMISM,
    EvmChainId.CRONOS,
    EvmChainId.ROOTSTOCK,
    EvmChainId.TELOS,
    EvmChainId.BSC,
    EvmChainId.OKEX,
    EvmChainId.BSC_TESTNET,
    EvmChainId.GNOSIS,
    EvmChainId.THUNDERCORE,
    EvmChainId.SHIBARIUM,
    EvmChainId.FUSE,
    EvmChainId.SONIC,
    EvmChainId.PUPPYNET,
    EvmChainId.MANTA,
    EvmChainId.BTTC,
    EvmChainId.FANTOM,
    EvmChainId.BOBA,
    EvmChainId.METIS,
    EvmChainId.POLYGON_ZKEVM,
    EvmChainId.CORE,
    EvmChainId.ZKSYNC_ERA,
    EvmChainId.BASE,
    EvmChainId.KAVA,
    EvmChainId.MOONBEAM,
    EvmChainId.MOONRIVER,
    EvmChainId.ZETACHAIN,
    EvmChainId.MANTLE,
    EvmChainId.FANTOM_TESTNET,
    EvmChainId.POLYGON,
    EvmChainId.POLYGON_TESTNET,
    EvmChainId.ARBITRUM,
    EvmChainId.ARBITRUM_NOVA,
    EvmChainId.ARBITRUM_TESTNET,
    EvmChainId.AVALANCHE,
    EvmChainId.AVALANCHE_TESTNET,
    EvmChainId.HECO,
    EvmChainId.HARMONY,
    EvmChainId.CELO,
    EvmChainId.PALM,
    EvmChainId.BOBA_AVAX,
    EvmChainId.BOBA_BNB,
    EvmChainId.SEPOLIA,
    EvmChainId.FILECOIN,
    EvmChainId.HAQQ,
    EvmChainId.LINEA,
    EvmChainId.SCROLL,
    EvmChainId.BLAST,
    EvmChainId.SKALE_EUROPA,
    EvmChainId.CURTIS,
    EvmChainId.MODE,
    EvmChainId.TAIKO,
    EvmChainId.ZKLINK,
    EvmChainId.APE,
    EvmChainId.HEMI,
  ];

  for (const chainId of ALL_CHAIN_IDS) {
    const expected =
      chainId === EvmChainId.SHIBARIUM || chainId === EvmChainId.PUPPYNET
        ? BONE_ADDRESS
        : ZERO_ADDRESS;
    it(`returns correct native address for chainId ${chainId}`, () => {
      expect(Native.onChain(chainId).address).toBe(expected);
    });
  }
});
