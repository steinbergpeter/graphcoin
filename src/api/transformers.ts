import {
  ScatterApiResponse,
  type CryptoApiResponse,
  type LatestTradesResponse,
  // type LatestTradesResponse,
} from './schemas';
import type {
  ScatterChartSeries,
  TransformedExchangeResponse,
  TransformedLatestTrades,
} from './types';

const rateTypes = ['rate_low', 'rate_close', 'rate_open', 'rate_high'] as const;
type RateType = (typeof rateTypes)[number];

const transformCryptoData = (
  parsedData: CryptoApiResponse
): TransformedExchangeResponse => {
  const transformed = rateTypes.map((rateType: RateType, index) => ({
    id: rateType,
    color: `hsl(${(index * 90) % 360}, 70%, 50%)`, // Generate unique colors
    data: parsedData
      .map((entry) => ({
        x: new Date(entry.time_period_start), // Convert string to Date object
        y: entry[rateType], // Dynamically access rate values
      }))
      .sort((a, b) => a.x.getTime() - b.x.getTime()), // Ensure chronological order
  }));

  return transformed;
};

const transformScatterData = (
  parsedData: ScatterApiResponse
): {
  BTC: ScatterChartSeries;
  ETH: ScatterChartSeries;
  XRP: ScatterChartSeries;
} => {
  return {
    BTC: {
      name: 'BTC',
      type: 'scatter',
      data: parsedData.BTC.map((entry) => [
        entry.price_close,
        entry.volume_traded,
      ]),
    },
    ETH: {
      name: 'ETH',
      type: 'scatter',
      data: parsedData.ETH.map((entry) => [
        entry.price_close,
        entry.volume_traded,
      ]),
    },
    XRP: {
      name: 'XRP',
      type: 'scatter',
      data: parsedData.XRP.map((entry) => [
        entry.price_close,
        entry.volume_traded,
      ]),
    },
  };
};

const transformLatestTrades = (
  parsedData: LatestTradesResponse
): TransformedLatestTrades => {
  return parsedData.map((trade) => ({
    'Symbol ID': trade.symbol_id,
    'Time Exchange': new Date(trade.time_exchange).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    'Time CoinAPI': new Date(trade.time_coinapi).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    ID: trade.uuid,
    Price: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(trade.price),
    Size: trade.size,
    'Taker Side': trade.taker_side,
  }));
};

export {
  transformCryptoData,
  transformScatterData,
  // transformTableData,
  transformLatestTrades,
};
