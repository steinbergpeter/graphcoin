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
  time_period_start: z.string().datetime(), // Ensures ISO-8601 format
  price_close: z.number().positive(), // Must be a positive number
  volume_traded: z.number().nonnegative(), // Must be non-negative
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
