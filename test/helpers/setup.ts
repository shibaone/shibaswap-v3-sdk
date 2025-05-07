import { EvmChainId } from "../../src/chain/evm/id.js";
import { evmNatives } from "../../src/chain/evm/index.js";

// Initialize native currencies before any other imports
Object.values(EvmChainId).forEach(chainId => {
  if (typeof chainId === 'number') {
    evmNatives[chainId] = {
      name: chainId === EvmChainId.ETHEREUM ? "Ether" : "Test Token",
      symbol: chainId === EvmChainId.ETHEREUM ? "ETH" : "TEST",
      decimals: 18,
    };
  }
});

// Special cases for commonly used chains
const SPECIAL_CASES = {
  [EvmChainId.ETHEREUM]: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  [EvmChainId.SEPOLIA]: {
    name: "Sepolia Ether",
    symbol: "ETH",
    decimals: 18,
  },
  [EvmChainId.GÖRLI]: {
    name: "Görli Ether",
    symbol: "ETH",
    decimals: 18,
  },
  [EvmChainId.POLYGON]: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  [EvmChainId.ARBITRUM]: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  [EvmChainId.OPTIMISM]: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  }
};

// Apply special cases
Object.entries(SPECIAL_CASES).forEach(([chainId, currency]) => {
  evmNatives[Number(chainId)] = currency;
});

// Now import the test chain data
import { TEST_CHAIN_DATA } from "./chain-data.js";
import { beforeAll } from "vitest";

beforeAll(() => {
  // Inject test chain data into evmNatives
  TEST_CHAIN_DATA.forEach((chain) => {
    evmNatives[chain.chainId] = chain.nativeCurrency;
  });
});
