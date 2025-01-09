import type { Sidebar } from 'vocs'

export const sidebar = {
  '/': [
    {
      text: 'Introduction',
      items: [
        { text: '❓ What is Sushi', link: '/what-is-sushi' },
        { text: '🤔 Why Sushi', link: '/why-sushi' },
        // { text: '🤝 Partnership', link: '/partnership' },
        { text: '🔒 Security', link: '/security' },
        // { text: '🔗 Ecosystem', link: '/ecosystem' },
        // { text: '🚀 Roadmap', link: '/roadmap' },
        { text: '👨‍👩‍👧‍👦 Community', link: '/community' },
        { text: '📚 Resources', link: '/resources' },
        { text: '🏛️ Governance', link: '/governance' },
      ],
    },
    {
      text: 'API',
      collapsed: true,
      items: [
        { text: 'Swap', link: '/api/swap' },
        { text: 'Price', link: '/api/price' },
        { text: 'Token', link: '/api/token' },
        // { text: 'Quote', link: '/api/quote' },
      ],
    },
    {
      text: 'SDK',
      collapsed: true,
      items: [
        { text: 'Installation', link: '/sdk/installation' },
        // { text: 'Quote', link: '/sdk/quote' },
        { text: 'Swap', link: '/sdk/swap' },
        // { text: 'Limit', link: '/sdk/limit' },
        // { text: 'DCA', link: '/sdk/dca' },
        // { text: 'Cross-Chain Swap', link: '/sdk/cross-chain-swap' },
        // { text: 'Viem', link: '/sdk/viem' },
      ],
    },
    // {
    //   text: 'Widget',
    //   collapsed: true,
    //   items: [],
    // },
    // {
    //   text: 'App',
    //   collapsed: true,
    //   items: [
    //     { text: 'Swap', link: '/app/swap' },
    //     { text: 'Limit', link: '/app/limit' },
    //     { text: 'DCA', link: '/app/dca' },
    //     { text: 'Cross-Chain Swap', link: '/app/cross-chain-swap' },
    //   ],
    // },
    {
      text: 'Aggregator',
      collapsed: true,
      items: [
        {
          text: 'Introduction',
          link: '/aggregator/introduction',
        },
      ],
    },
    {
      text: 'AMM',
      collapsed: true,
      items: [
        {
          text: 'Introduction',
          link: '/amm/introduction',
        },
        {
          text: 'clAMM (SuhiSwap V3)',
          link: '/amm/clamm',
        },
        {
          text: 'cpAMM  (SuhiSwap V2)',
          link: '/amm/cpamm',
        },
        // {
        //   text: 'lbAMM',
        //   link: '/amm/lbamm',
        // },
      ],
    },
    {
      text: 'Contracts',
      collapsed: true,
      items: [
        { text: 'SUSHI', link: '/contracts/sushi' },
        { text: 'xSUSHI', link: '/contracts/xsushi' },
        { text: 'Route Processor', link: '/contracts/route-processor' },
        { text: 'clAMM  (SuhiSwap V3)', link: '/contracts/clamm' },
        { text: 'cpAMM  (SuhiSwap V2)', link: '/contracts/cpamm' },
        // { text: 'lbAMM', link: '/contracts/lbamm' },
      ],
    },
    {
      text: 'Subraphs',
      collapsed: true,
      items: [
        { text: 'Blocks', link: '/subgraphs/blocks' },
        { text: 'clAMM (SuhiSwap V3)', link: '/subgraphs/clamm' },
        { text: 'cpAMM (SuhiSwap V2)', link: '/subgraphs/cpamm' },
        { text: 'xSUSHI', link: '/subgraphs/xsushi' },
        // { text: 'Quote', link: '/api/quote' },
      ],
    },
    // {
    //   text: 'Guides',
    //   items: [
    //     { text: 'Swap', link: '/swap' },
    //     { text: 'Cross-Chain Swap', link: '/cross-chain-swap' },
    //     { text: 'Add Liquidity', link: '/add-liquidity' },
    //     { text: 'Remove Liquidity', link: '/remove-liquidity' },
    //     { text: 'Zap', link: '/zap' },
    //     // { text: 'Migration Guide', link: '/migration-guide' },
    //     // { text: 'Ethers v5 → viem', link: '/ethers-migration' },
    //     // { text: 'TypeScript', link: '/typescript' },
    //     // { text: 'Error Handling', link: '/error-handling' },
    //     // { text: 'Blob Transactions', link: '/guides/blob-transactions' },
    //   ],
    // },
  ],
} as const satisfies Sidebar
