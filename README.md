# Installation

Install ShibaSwap V3 SDK via your package manager, a `<script>` tag, or build from source.

## Package Manager

Install the required packages:

```bash
pnpm add shibaswap-v3-sdk viem
```

## CDN

If you're not using a package manager, you can also use ShibaSwap V3 SDK via an ESM-compatible CDN such as esm.sh. Simply add a `<script type="module">` tag to the bottom of your HTML file with the following content:

```html
<script type="module">
  import { getSwap, ChainId } from "https://esm.sh/shibaswap-v3-sdk";

  const swap = await getSwap({
    chainId: ChainId.ETHEREUM,
    tokenIn: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    tokenOut: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE", // SHIB token address
    amount: 1000000000000000000n,
    maxSlippage: 0.005,
  });

  console.log(swap);
</script>
```

## Note

This SDK is a fork of the [Sushi SDK](https://docs.sushi.com/sdk/installation), modified and maintained by the ShibaSwap team for integration with ShibaSwap V3 protocol.

## Features

- Full TypeScript support
- First-class viem support
- Tree-shakeable and lightweight
- ESM and CJS builds
- Extensive documentation
- Comprehensive test coverage

```
                                      ████████████████
                                  ████░░▒▒▒▒▒▒░░░░▒▒▒▒██████
                                ██▒▒░░▒▒░░░░░░░░░░░░░░░░░░░░████
                          ████████▒▒░░▒▒░░░░░░░░░░░░░░░░░░░░░░░░████
                    ▒▒▒▒██▒▒▒▒░░▒▒██████▒▒░░░░░░░░░░░░░░▒▒░░░░░░▒▒▒▒██
                ████░░▒▒░░▒▒░░░░░░░░░░░░████▒▒▒▒░░░░░░░░░░░░░░▒▒░░░░▒▒██
              ██░░░░░░░░▒▒░░▒▒░░░░░░░░░░░░░░████▒▒░░░░░░░░░░░░░░░░░░░░░░██
            ██▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒████░░░░░░░░░░░░░░░░░░░░▒▒██
            ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██▒▒░░░░░░░░░░░░░░░░░░▒▒██
          ██░░▒▒░░░░░░░░░░░░░░░░░░▒▒░░░░░░▒▒░░░░░░░░▒▒██▒▒░░▒▒░░░░░░░░░░░░░░░░██
      ▓▓▓▓▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒██▒▒░░░░░░░░░░░░░░░░▒▒██
  ████░░░░░░░░░░░░▒▒░░▒▒▒▒░░▒▒░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒██▒▒░░░░░░░░░░░░░░░░▒▒██
██░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░▒▒▒▒░░▒▒░░░░░░░░░░░░░░░░░░░░░░░░██░░▒▒░░░░░░░░░░░░░░██
██░░░░░░▒▒▒▒▒▒▒▒██████████▒▒▒▒▒▒░░▒▒▒▒░░░░░░▒▒▒▒░░░░░░░░░░▒▒▒▒▓▓▒▒░░░░░░░░░░░░░░▒▒██
  ██▒▒▒▒▒▒██████░░░░░░░░░░██████▒▒▒▒▒▒░░▒▒░░▒▒▒▒░░░░░░░░░░▒▒░░░░██░░░░░░░░░░░░░░░░██
  ████████      ██  ░░    ░░░░░░██████▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░▒▒░░██▒▒▒▒░░░░░░░░░░░░░░██
                ██            ░░░░░░░░████▒▒▒▒░░▒▒░░░░░░░░░░░░▒▒░░██▒▒▒▒░░░░▒▒▒▒░░░░░░██
                  ████    ░░    ░░    ░░░░████▒▒▒▒▒▒░░░░░░░░░░░░░░████▒▒░░░░░░░░░░░░░░▒▒██
                      ████        ░░  ░░  ░░░░██▒▒░░▒▒░░░░░░░░░░░░▒▒████▒▒▒▒░░░░░░░░░░░░░░████
                          ████                ░░██▒▒▒▒▒▒░░░░░░░░░░▒▒██░░██▒▒▒▒░░░░░░░░░░░░░░▒▒██
                              ▓▓▓▓  ░░    ░░░░  ░░██▒▒░░▒▒░░░░░░░░░░▒▒██  ██▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██
                                  ████████        ░░██▒▒▒▒▒▒░░░░░░░░░░▒▒██████▒▒▒▒░░░░▒▒████
                                  ░░░░░░  ▓▓██████████▒▒▒▒▒▒░░░░░░░░░░░░▒▒▒▒▒▒▒▒██▓▓▓▓▓▓  ░░
                                                      ██▒▒▒▒▒▒▒▒░░░░░░░░░░░░▒▒██
                                                        ████▒▒▒▒▒▒░░░░░░▒▒▒▒██
                                                            ████▒▒▒▒▒▒▒▒████
                                                                ████████
```

## Install

https://docs.sushi.com/sdk/installation

[build-img]: https://github.com/sushi-labs/sushi/actions/workflows/changesets.yaml/badge.svg
[build-url]: https://github.com/sushi-labs/sushi/actions/workflows/changesets.yaml
[downloads-img]: https://img.shields.io/npm/dt/sushi
[downloads-url]: https://www.npmtrends.com/sushi
[npm-img]: https://img.shields.io/npm/v/sushi
[npm-url]: https://www.npmjs.com/package/sushi
[issues-img]: https://img.shields.io/github/issues/sushi-labs/sushi
[issues-url]: https://github.com/sushi-labs/sushi/issues
[codecov-img]: https://codecov.io/gh/sushi-labs/sushi/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/sushi-labs/sushi
