export const ShibaSwapProtocol = {
  SHIBASWAP_V2: "SHIBASWAP_V2",
  SHIBASWAP_V3: "SHIBASWAP_V3",
} as const;

export type ShibaSwapProtocol =
  (typeof ShibaSwapProtocol)[keyof typeof ShibaSwapProtocol];

export type ShibaSwapV2Protocol = (typeof ShibaSwapProtocol)["SHIBASWAP_V2"];
export type ShibaSwapV3Protocol = (typeof ShibaSwapProtocol)["SHIBASWAP_V3"];
