import * as z from "zod";
import { amountSchema } from "../../currency/index.js";

export const shibaSwapV2PoolSchema = z.object({
  reserve0: amountSchema,
  reserve1: amountSchema,
});

export type SerializedShibaSwapV2Pool = z.infer<typeof shibaSwapV2PoolSchema>;
