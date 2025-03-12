import type { GetExchangeInput, GetScatterInput } from './types';
import { type ScatterApiResponse } from './schemas';

const baseUrl = 'https://rest.coinapi.io/v1/';
const config = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'X-CoinAPI-Key': import.meta.env.VITE_COIN_API_KEY,
  },
};

export const queryExchange = async ({
  exchange,
  start,
  end,
}: GetExchangeInput) => {
  const url = `${baseUrl}exchangerate/${exchange}/USD/history?period_id=1DAY&time_start=${start}&time_end=${end}`;
  const response = await fetch(url, config);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
  }
  return await response.json();
};

export const queryScatter = async ({
  start,
  end,
}: GetScatterInput): Promise<ScatterApiResponse> => {
  const symbols = {
    BTC: 'BITSTAMP_SPOT_BTC_USD',
    ETH: 'BITSTAMP_SPOT_ETH_USD',
    XRP: 'BITSTAMP_SPOT_XRP_USD',
  };

  const responses: Partial<ScatterApiResponse> = {}; // Use Partial to initialize an empty object

  for (const [key, symbol] of Object.entries(symbols)) {
    const url = `${baseUrl}ohlcv/${symbol}/history?period_id=1DAY&time_start=${start}&time_end=${end}`;
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${key} data: ${response.statusText}`);
    }

    responses[key as keyof ScatterApiResponse] = await response.json();
  }

  return responses as ScatterApiResponse; // Assert as CryptoResponse since we filled all keys
};
