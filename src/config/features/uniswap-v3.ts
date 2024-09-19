import { ChainId } from '../../chain/index.js'

const POOL_INIT_CODE_HASH =
  '0xe34f199b19b2b4f47f68442619d555527d244f78a3297ea89325f843f87b8b54'

/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */

export enum UniswapV3FeeAmount {
  /** 0.01% */
  LOWEST = 100,
  /** 0.1% */
  LOW = 500,
  /** 0.3% */
  MEDIUM = 3000,
  /** 1% */
  HIGH = 10000,
}

/**
 * The default factory tick spacings by fee amount.
 */
export const UNISWAP_V3_TICK_SPACINGS: {
  [_amount in UniswapV3FeeAmount]: number
} = {
  [UniswapV3FeeAmount.LOWEST]: 1,
  [UniswapV3FeeAmount.LOW]: 10,
  [UniswapV3FeeAmount.MEDIUM]: 60,
  [UniswapV3FeeAmount.HIGH]: 200,
}

export const UNISWAP_V3_SUPPORTED_CHAIN_IDS = [
  ChainId.ARBITRUM,
  ChainId.BSC,
  ChainId.CELO,
  ChainId.ETHEREUM,
  ChainId.OPTIMISM,
  ChainId.POLYGON,
  ChainId.BASE,
  ChainId.AVALANCHE,
  // OKU
  ChainId.BOBA,
  ChainId.ROOTSTOCK,
  ChainId.SCROLL,
  ChainId.FILECOIN,
  ChainId.MOONBEAM,
  ChainId.LINEA,
  ChainId.BLAST,
  ChainId.ZKSYNC_ERA,
  ChainId.POLYGON_ZKEVM,
  ChainId.MANTLE,
] as const

export const UniswapV3ChainIds = UNISWAP_V3_SUPPORTED_CHAIN_IDS

export type UniswapV3ChainId = (typeof UNISWAP_V3_SUPPORTED_CHAIN_IDS)[number]

export const isUniswapV3ChainId = (
  chainId: ChainId,
): chainId is UniswapV3ChainId =>
  UNISWAP_V3_SUPPORTED_CHAIN_IDS.includes(chainId as UniswapV3ChainId)

export const UNISWAP_V3_INIT_CODE_HASH: Record<
  UniswapV3ChainId,
  `0x${string}`
> = {
  [ChainId.ETHEREUM]: POOL_INIT_CODE_HASH,
  [ChainId.POLYGON]: POOL_INIT_CODE_HASH,
  [ChainId.ARBITRUM]: POOL_INIT_CODE_HASH,
  [ChainId.OPTIMISM]: POOL_INIT_CODE_HASH,
  [ChainId.BSC]: POOL_INIT_CODE_HASH,
  [ChainId.CELO]: POOL_INIT_CODE_HASH,
  [ChainId.BASE]: POOL_INIT_CODE_HASH,
  [ChainId.AVALANCHE]: POOL_INIT_CODE_HASH,
  // OKU
  [ChainId.SCROLL]: POOL_INIT_CODE_HASH,
  [ChainId.ROOTSTOCK]: POOL_INIT_CODE_HASH,
  [ChainId.FILECOIN]: POOL_INIT_CODE_HASH,
  [ChainId.BOBA]: POOL_INIT_CODE_HASH,
  [ChainId.MOONBEAM]: POOL_INIT_CODE_HASH,
  [ChainId.LINEA]: POOL_INIT_CODE_HASH,
  [ChainId.BLAST]: POOL_INIT_CODE_HASH,
  [ChainId.ZKSYNC_ERA]:
    '0x010013f177ea1fcbc4520f9a3ca7cd2d1d77959e05aa66484027cb38e712aeed',
  [ChainId.POLYGON_ZKEVM]: POOL_INIT_CODE_HASH,
  [ChainId.MANTLE]: POOL_INIT_CODE_HASH,
} as const

export const UNISWAP_V3_FACTORY_ADDRESS: Record<
  UniswapV3ChainId,
  `0x${string}`
> = {
  [ChainId.ETHEREUM]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  [ChainId.POLYGON]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  [ChainId.ARBITRUM]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  [ChainId.OPTIMISM]: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  [ChainId.BSC]: '0xdB1d10011AD0Ff90774D0C6Bb92e5C5c8b4461F7',
  [ChainId.CELO]: '0xAfE208a311B21f13EF87E33A90049fC17A7acDEc',
  [ChainId.BASE]: '0x33128a8fC17869897dcE68Ed026d694621f6FDfD',
  [ChainId.AVALANCHE]: '0x740b1c1de25031C31FF4fC9A62f554A55cdC1baD',
  // OKU
  [ChainId.SCROLL]: '0x70C62C8b8e801124A4Aa81ce07b637A3e83cb919',
  [ChainId.ROOTSTOCK]: '0xaF37EC98A00FD63689CF3060BF3B6784E00caD82',
  [ChainId.FILECOIN]: '0xB4C47eD546Fc31E26470a186eC2C5F19eF09BA41',
  [ChainId.BOBA]: '0xFFCd7Aed9C627E82A765c3247d562239507f6f1B',
  [ChainId.MOONBEAM]: '0x28f1158795A3585CaAA3cD6469CD65382b89BB70',
  [ChainId.LINEA]: '0x31FAfd4889FA1269F7a13A66eE0fB458f27D72A9',
  [ChainId.BLAST]: '0x792edAdE80af5fC680d96a2eD80A44247D2Cf6Fd',
  [ChainId.ZKSYNC_ERA]: '0x8FdA5a7a8dCA67BBcDd10F02Fa0649A937215422',
  [ChainId.POLYGON_ZKEVM]: '0xff83c3c800Fec21de45C5Ec30B69ddd5Ee60DFC2',
  [ChainId.MANTLE]: '0x0d922Fb1Bc191F64970ac40376643808b4B74Df9',
} as const
