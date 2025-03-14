import { queryExchange, queryLatestTrades, queryScatter } from './queries';
import {
  transformCryptoData,
  transformLatestTrades,
  transformScatterData,
} from './transformers';
import type {
  GetExchangeInput,
  GetScatterInput,
  ScatterChartSeries,
  TransformedLatestTrades,
} from './types';
import { validator } from './validator';
import {
  CryptoApiResponseSchema,
  LatestTradesResponseSchema,
  scatterApiResponseSchema,
  type LatestTradesInput,
  // type LatestTradesResponse,
} from './schemas';

const getExchange = async ({ exchange, start, end }: GetExchangeInput) => {
  try {
    const rawApiData: unknown = await queryExchange({ exchange, start, end });
    const validatedApiData = validator(rawApiData, CryptoApiResponseSchema);
    const transformedData = transformCryptoData(validatedApiData);
    return transformedData;
  } catch (error) {
    console.log((error as Error).message);
  }
};

const getScatter = async ({
  start,
  end,
}: GetScatterInput): Promise<{
  BTC: ScatterChartSeries;
  ETH: ScatterChartSeries;
  XRP: ScatterChartSeries;
}> => {
  try {
    const rawApiData: unknown = await queryScatter({ start, end });
    const validatedApiData = validator(rawApiData, scatterApiResponseSchema);
    const transformedData = transformScatterData(validatedApiData);
    return transformedData;
  } catch (error) {
    console.log((error as Error).message);
    return {
      BTC: { name: 'BTC', type: 'scatter', data: [] },
      ETH: { name: 'ETH', type: 'scatter', data: [] },
      XRP: { name: 'XRP', type: 'scatter', data: [] },
    };
  }
};

const getLatestTrades = async ({
  limit,
}: LatestTradesInput): Promise<TransformedLatestTrades> => {
  try {
    const rawApiData: unknown = await queryLatestTrades({ limit });
    const validatedApiData = validator(rawApiData, LatestTradesResponseSchema);
    const transformedData = transformLatestTrades(validatedApiData);
    return transformedData;
  } catch (error) {
    console.log((error as Error).message);
    return [];
  }
};

export { getExchange, getScatter, getLatestTrades };
