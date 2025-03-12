import { ScatterApiResponse, type CryptoApiResponse } from './schemas';
import { ScatterChartSeries } from './types';

const rateTypes = ['rate_low', 'rate_close', 'rate_open', 'rate_high'] as const;
type RateType = (typeof rateTypes)[number];

const transformCryptoData = (parsedData: CryptoApiResponse) => {
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
): ScatterChartSeries[] => {
  return Object.entries(parsedData).map(([key, data]) => ({
    name: key, // Series name (BTC, ETH, XRP)
    type: 'scatter' as const, // 🔹 Ensure it's a literal type, not just a string
    data: data
      .map(
        (entry) => [entry.price_close, entry.volume_traded] as [number, number]
      ) // 🔹 Explicitly enforce tuple type
      .sort((a, b) => a[0] - b[0]), // Ensure sorted by price (X-axis)
  }));
};

export { transformCryptoData, transformScatterData };
