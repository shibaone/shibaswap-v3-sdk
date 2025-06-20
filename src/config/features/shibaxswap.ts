import { EvmChainId } from "../../chain/evm/index.js";

export const SHIBAXSWAP_SUPPORTED_CHAIN_IDS = [
  EvmChainId.ARBITRUM,
  EvmChainId.AVALANCHE,
  EvmChainId.BSC,
  EvmChainId.ETHEREUM,
  EvmChainId.FANTOM,
  EvmChainId.OPTIMISM,
  EvmChainId.POLYGON,
] as const;

export type ShibaXSwapChainId = (typeof SHIBAXSWAP_SUPPORTED_CHAIN_IDS)[number];

export const SHIBAXSWAP_ADDRESS: Record<ShibaXSwapChainId, `0x${string}`> = {
  [EvmChainId.ARBITRUM]: "0x53b08DbD70327b7Ba3B7886Fc9987BC985d27262",
  [EvmChainId.AVALANCHE]: "0x2c8C987C4777AB740d20Cb581f5d381BE95A4A4a",
  [EvmChainId.BSC]: "0x7A4af156379f512DE147ed3b96393047226d923F",
  [EvmChainId.ETHEREUM]: "0x011E52E4E40CF9498c79273329E8827b21E2e581",
  [EvmChainId.FANTOM]: "0xD045d27c1f7e7f770a807B0a85d8e3F852e0F2BE",
  [EvmChainId.OPTIMISM]: "0x8B396ddF906D552b2F98a8E7d743DD58Cd0d920f",
  [EvmChainId.POLYGON]: "0xd08b5f3e89F1e2d6b067e0A0cbdb094e6e41E77c",
} as const;

export const isShibaXSwapChainId = (
  chainId: EvmChainId
): chainId is ShibaXSwapChainId =>
  SHIBAXSWAP_SUPPORTED_CHAIN_IDS.includes(chainId as ShibaXSwapChainId);

export const SHIBAXSWAP_2_SUPPORTED_CHAIN_IDS = [
  EvmChainId.ETHEREUM,
  EvmChainId.BSC,
  EvmChainId.AVALANCHE,
  EvmChainId.POLYGON,
  EvmChainId.ARBITRUM,
  EvmChainId.OPTIMISM,
  EvmChainId.BASE,
  EvmChainId.FANTOM,
  EvmChainId.LINEA,
  EvmChainId.KAVA,
  // EvmChainId.METIS,
  EvmChainId.MOONBEAM,
  EvmChainId.CELO,
  EvmChainId.SCROLL,
  EvmChainId.FILECOIN,
  EvmChainId.BLAST,
] as const;

export type ShibaXSwap2ChainId =
  (typeof SHIBAXSWAP_2_SUPPORTED_CHAIN_IDS)[number];

export const SHIBAXSWAP_2_ADDRESS: Record<ShibaXSwap2ChainId, `0x${string}`> = {
  [EvmChainId.ETHEREUM]: "0x804b526e5bf4349819fe2db65349d0825870f8ee",
  [EvmChainId.BSC]: "0x804b526e5bf4349819fe2db65349d0825870f8ee",
  [EvmChainId.AVALANCHE]: "0x804b526e5bf4349819fe2db65349d0825870f8ee",
  [EvmChainId.POLYGON]: "0x804b526e5bf4349819fe2db65349d0825870f8ee",
  [EvmChainId.ARBITRUM]: "0x804b526e5bf4349819fe2db65349d0825870f8ee",
  [EvmChainId.OPTIMISM]: "0x804b526e5bf4349819fe2db65349d0825870f8ee",
  [EvmChainId.BASE]: "0x804b526e5bf4349819fe2db65349d0825870f8ee",
  [EvmChainId.FANTOM]: "0x804b526e5bf4349819fe2db65349d0825870f8ee",
  [EvmChainId.LINEA]: "0x804b526e5bf4349819fe2db65349d0825870f8ee",
  [EvmChainId.KAVA]: "0xD5607d184b1D6ecbA94A07c217497FE9346010D9",
  // [EvmChainId.METIS]: '0x804b526e5bf4349819fe2db65349d0825870f8ee',
  [EvmChainId.MOONBEAM]: "0x804b526e5bf4349819fe2db65349d0825870f8ee",
  [EvmChainId.CELO]: "0x804b526e5bf4349819fe2db65349d0825870f8ee",
  [EvmChainId.SCROLL]: "0x804b526e5bf4349819fe2db65349d0825870f8ee",
  [EvmChainId.FILECOIN]: "0x804b526e5bf4349819fe2db65349d0825870f8ee",
  [EvmChainId.BLAST]: "0x804b526e5bf4349819fe2db65349d0825870f8ee",
} as const;

export const isShibaXSwap2ChainId = (
  chainId: EvmChainId
): chainId is ShibaXSwap2ChainId =>
  SHIBAXSWAP_2_SUPPORTED_CHAIN_IDS.includes(chainId as ShibaXSwap2ChainId);

export const STARGATE_ADAPTER_SUPPORTED_CHAIN_IDS = [
  EvmChainId.ETHEREUM,
  EvmChainId.BSC,
  EvmChainId.AVALANCHE,
  EvmChainId.POLYGON,
  EvmChainId.ARBITRUM,
  EvmChainId.OPTIMISM,
  EvmChainId.BASE,
] as const;

export type StargateAdapterChainId =
  (typeof STARGATE_ADAPTER_SUPPORTED_CHAIN_IDS)[number];

export const STARGATE_ADAPTER_ADDRESS: Record<
  StargateAdapterChainId,
  `0x${string}`
> = {
  [EvmChainId.ETHEREUM]: "0xD408a20f1213286fB3158a2bfBf5bFfAca8bF269",
  [EvmChainId.BSC]: "0xFF51a7C624Eb866917102707F3dA8bFb99Db8692",
  [EvmChainId.AVALANCHE]: "0xFF51a7C624Eb866917102707F3dA8bFb99Db8692",
  [EvmChainId.POLYGON]: "0x1719DEf1BF8422a777f2442bcE704AC4Fb20c7f0",
  [EvmChainId.ARBITRUM]: "0xFF51a7C624Eb866917102707F3dA8bFb99Db8692",
  [EvmChainId.OPTIMISM]: "0xA62eC622DbA415Aa94110739B1f951B1202Cf322",
  [EvmChainId.BASE]: "0xD408a20f1213286fB3158a2bfBf5bFfAca8bF269",
} as const;

export const isStargateAdapterChainId = (
  chainId: EvmChainId
): chainId is StargateAdapterChainId =>
  STARGATE_ADAPTER_SUPPORTED_CHAIN_IDS.includes(
    chainId as StargateAdapterChainId
  );

export const SQUID_ADAPTER_SUPPORTED_CHAIN_IDS = [
  EvmChainId.ETHEREUM,
  EvmChainId.BSC,
  EvmChainId.AVALANCHE,
  EvmChainId.POLYGON,
  EvmChainId.ARBITRUM,
  EvmChainId.OPTIMISM,
  EvmChainId.BASE,
  EvmChainId.FANTOM,
  EvmChainId.LINEA,
  EvmChainId.KAVA,
  EvmChainId.MOONBEAM,
  EvmChainId.CELO,
  EvmChainId.SCROLL,
  EvmChainId.FILECOIN,
  EvmChainId.BLAST,
] as const;

export type SquidAdapterChainId =
  (typeof SQUID_ADAPTER_SUPPORTED_CHAIN_IDS)[number];

export const SQUID_ADAPTER_ADDRESS: Record<SquidAdapterChainId, `0x${string}`> =
  {
    [EvmChainId.ETHEREUM]: "0xFF51a7C624Eb866917102707F3dA8bFb99Db8692",
    [EvmChainId.BSC]: "0xbF3B71decBCEFABB3210B9D8f18eC22e0556f5F0",
    [EvmChainId.AVALANCHE]: "0xbF3B71decBCEFABB3210B9D8f18eC22e0556f5F0",
    [EvmChainId.POLYGON]: "0x1B4eb3e90dA47ff898d2cda40B5750721886E850",
    [EvmChainId.ARBITRUM]: "0x454714482cA38fBBcE7fC76D96Ba1CE2028A4fF6",
    [EvmChainId.OPTIMISM]: "0xbF3B71decBCEFABB3210B9D8f18eC22e0556f5F0",
    [EvmChainId.BASE]: "0xFF51a7C624Eb866917102707F3dA8bFb99Db8692",
    [EvmChainId.FANTOM]: "0x454714482cA38fBBcE7fC76D96Ba1CE2028A4fF6",
    [EvmChainId.LINEA]: "0xbF3B71decBCEFABB3210B9D8f18eC22e0556f5F0",
    [EvmChainId.KAVA]: "0xEfb2b93B2a039A227459AAD0572a019Aba8eA69d",
    [EvmChainId.MOONBEAM]: "0x02a480a258361c9Bc3eaacBd6473364C67adCD3a",
    [EvmChainId.CELO]: "0x02a480a258361c9Bc3eaacBd6473364C67adCD3a",
    [EvmChainId.SCROLL]: "0x02a480a258361c9Bc3eaacBd6473364C67adCD3a",
    [EvmChainId.FILECOIN]: "0xd5607d184b1d6ecba94a07c217497fe9346010d9",
    [EvmChainId.BLAST]: "0x09938716c4a086a4ebfe10377fdad96f32541303",
  } as const;

export const isSquidAdapterChainId = (
  chainId: EvmChainId
): chainId is SquidAdapterChainId =>
  SQUID_ADAPTER_SUPPORTED_CHAIN_IDS.includes(chainId as SquidAdapterChainId);

export const SHIBASWAP_X_CHAIN_SUPPORTED_CHAIN_IDS = [
  EvmChainId.AVALANCHE_TESTNET,
  EvmChainId.ARBITRUM_TESTNET,
  // EvmChainId.BASE_TESTNET,
  EvmChainId.PUPPYNET,
  EvmChainId.SEPOLIA,
] as const;

export type ShibaSwapXChainId =
  (typeof SHIBASWAP_X_CHAIN_SUPPORTED_CHAIN_IDS)[number];

export const SHIBASWAP_X_CHAIN_ADDRESS: Record<
  ShibaSwapXChainId,
  `0x${string}`
> = {
  [EvmChainId.AVALANCHE_TESTNET]: "0x483F576c6572EC6a1B35ED9fbAA43CD5F3F3a902",
  [EvmChainId.ARBITRUM_TESTNET]: "0xDf0512B398f202Fec1892aDedCc471eB0243b3BD",
  // [EvmChainId.BASE_TESTNET]: "0x0Fcd26b659aC7a6B7d8E63FFc038b367885fE196",
  [EvmChainId.PUPPYNET]: "0x99cd243A12B35B111832f22D7A5E232598dE7B37",
  [EvmChainId.SEPOLIA]: "0x4af7f557Fa4ccfD8c90A67f11ff1C00B826d307F",
} as const;

export const isShibaSwapXChainId = (
  chainId: EvmChainId
): chainId is ShibaSwapXChainId =>
  SHIBASWAP_X_CHAIN_SUPPORTED_CHAIN_IDS.includes(chainId as ShibaSwapXChainId);
