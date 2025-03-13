import { ScatterApiResponse, type CryptoApiResponse } from './schemas';
import type { ScatterChartSeries, TransformedExchangeResponse } from './types';

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

// const transformScatterData = (
//   parsedData: ScatterApiResponse
// ): ScatterChartSeries[] => {
//   return Object.entries(parsedData).map(([series_name, data]) => ({
//     name: series_name,
//     type: 'scatter' as const,
//     data: data
//       .map(
//         (entry) => [entry.price_close, entry.volume_traded] as [number, number]
//       )
//       .sort((a, b) => a[0] - b[0]), // Sort by price
//   }));
// };

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

export { transformCryptoData, transformScatterData };
