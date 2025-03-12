export type GetExchangeInput = {
  exchange: string;
  start: string;
  end: string;
};

export type TransformedCryptoData = {
  id: 'rate_close' | 'rate_high' | 'rate_low' | 'rate_open';
  color: string;
  data: { x: string; y: number }[];
};

export type GetScatterInput = {
  start: string;
  end: string;
};

export type ScatterChartSeries = {
  name: string; // e.g., "BTC", "ETH", "XRP"
  type: 'scatter'; // Always "scatter" for this chart
  data: [number, number][]; // Array of [price, volume] pairs
};
