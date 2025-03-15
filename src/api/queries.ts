// filepath: /Users/petermacbookpro/Developer/graphcoin/src/api/queries.ts
import type { GetExchangeInput, GetScatterInput } from './types';
import {
  type LatestTradesResponse,
  type ScatterApiResponse,
  type LatestTradesInput,
  type ExchangeResponse,
} from './schemas';

const baseUrl = 'https://rest.coinapi.io/v1/';
const config = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'X-CoinAPI-Key': import.meta.env.VITE_COIN_API_KEY,
  },
};
const symbols = {
  BTC: 'BITSTAMP_SPOT_BTC_USD',
  ETH: 'BITSTAMP_SPOT_ETH_USD',
  XRP: 'BITSTAMP_SPOT_XRP_USD',
};

export const queryExchange = async ({
  exchange,
  start,
  end,
}: GetExchangeInput): Promise<ExchangeResponse> => {
  const url = `${baseUrl}exchangerate/${exchange}/USD/history?period_id=1DAY&time_start=${start}&time_end=${end}`;
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(`Failed to query exchange data: ${response.statusText}`);
  }
  const res = await response.json();
  return res;
};

export const queryScatter = async ({
  start,
}: GetScatterInput): Promise<ScatterApiResponse> => {
  const responses: Partial<ScatterApiResponse> = {};
  for (const [key, symbol] of Object.entries(symbols)) {
    const url = `${baseUrl}ohlcv/${symbol}/history?period_id=1DAY&time_start=${start}`;
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(
        `Failed to query ${key} scatter data: ${response.statusText}`
      );
    }
    responses[key as keyof ScatterApiResponse] = await response.json();
  }
  return responses as ScatterApiResponse;
};

export const queryLatestTrades = async ({
  limit,
}: LatestTradesInput): Promise<LatestTradesResponse> => {
  const url = `${baseUrl}trades/latest?limit=${limit}`;
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(`Failed to query latest trades data: ${response.status}`);
  }
  return await response.json();
};
