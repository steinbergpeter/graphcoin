import { z } from 'zod';

// // LINE CHART (NIVO)
// validate a single entry of the API response
export const CryptoDataSchema = z.object({
  rate_close: z.number(),
  rate_high: z.number(),
  rate_low: z.number(),
  rate_open: z.number(),
  time_close: z.string().datetime(),
  time_open: z.string().datetime(),
  time_period_end: z.string().datetime(),
  time_period_start: z.string().datetime(),
});

// validate the entire response array
export const CryptoApiResponseSchema = z.array(CryptoDataSchema);

// type from the schema
export type CryptoApiResponse = z.infer<typeof CryptoApiResponseSchema>;

// // SCATTER CHART (APACHE E_CHART)
// single data point in the scatter chart
export const scatterDataPointSchema = z.object({
  time_period_start: z.string().datetime(),
  price_close: z.number().positive(),
  volume_traded: z.number().nonnegative(),
});

// full scatter chart dataset (BTC, ETH, XRP)
export const scatterApiResponseSchema = z.object({
  BTC: z.array(scatterDataPointSchema),
  ETH: z.array(scatterDataPointSchema),
  XRP: z.array(scatterDataPointSchema),
});

// types from the schema
export type ScatterDataPoint = z.infer<typeof scatterDataPointSchema>;
export type ScatterApiResponse = z.infer<typeof scatterApiResponseSchema>;

// // TABLE (AG_GRID)

export const LatestTradesInputSchema = z.object({
  limit: z.number(), // Optional limit for the number of trades to fetch
});
export type LatestTradesInput = z.infer<typeof LatestTradesInputSchema>;

export const LatestTradesSchema = z.object({
  symbol_id: z.string(),
  time_exchange: z.string(),
  time_coinapi: z.string(),
  uuid: z.string(),
  price: z.number(),
  size: z.number(),
  taker_side: z.string(),
});

export const LatestTradesResponseSchema = z.array(LatestTradesSchema);

export type LatestTradesResponse = z.infer<typeof LatestTradesResponseSchema>;

export const TransformedLatestTradesResponseUnitSchema = z.object({
  'Symbol ID': z.string(),
  time_exchange: z.string(),
  time_coinapi: z.string(),
  id: z.string(),
  price: z.number(),
  size: z.number(),
  taker_side: z.string(),
});

export const TransformedLatestTradesResponseSchema = z.array(
  TransformedLatestTradesResponseUnitSchema
);
export type TransformedLatestTradesResponse = z.infer<
  typeof TransformedLatestTradesResponseSchema
>;
