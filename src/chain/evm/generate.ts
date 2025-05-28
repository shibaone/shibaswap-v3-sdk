import { existsSync, writeFileSync } from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { EvmChainId } from "./id.js";
import type { EvmChainBase } from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const additional: EvmChainBase[] = [
  {
    name: "ApeChain",
    nativeCurrency: {
      name: "ApeCoin",
      symbol: "APE",
      decimals: 18,
    },
    shortName: "apechain",
    chainId: 33139,
    explorers: [
      {
        name: "ApeChain Explorer",
        url: "https://apescan.io",
        standard: "EIP3091",
      },
    ],
  },
  {
    name: "Shibarium",
    nativeCurrency: {
      name: "BONE",
      symbol: "BONE",
      decimals: 18,
    },
    shortName: "shibarium",
    chainId: 109,
    explorers: [
      {
        name: "Shibarium Explorer",
        url: "https://shibariumscan.io",
        standard: "EIP3091",
      },
    ],
  },
  {
    name: "PuppyNet",
    nativeCurrency: {
      name: "BONE",
      symbol: "BONE",
      decimals: 18,
    },
    shortName: "puppynet",
    chainId: 157,
    explorers: [
      {
        name: "PuppyNet Explorer",
        url: "https://puppyscan.shib.io",
        standard: "EIP3091",
      },
    ],
  },
];
(async () => {
  const file = path.resolve(__dirname, "./generated-chain-data.ts");
  if (!existsSync(file)) {
    const fetchedChains = (await fetch(
      "https://chainid.network/chains.json"
    ).then((data) => data.json())) as EvmChainBase[];
    const chains = [...fetchedChains, ...additional];

    writeFileSync(
      file,
      `// THIS IS A GENERATED FILE\n\nexport default ${JSON.stringify(
        chains
          .filter(({ chainId }) =>
            Object.values(EvmChainId).find((id) => id === chainId)
          )
          .map(
            ({
              chainId,
              explorers,
              nativeCurrency,
              name,
              shortName,
              parent,
            }) => ({
              chainId,
              explorers,
              nativeCurrency,
              name,
              shortName,
              parent,
            })
          ),
        null,
        2
      )} as const;\n\n`
    );
  }
  process.exit(0);
})();
