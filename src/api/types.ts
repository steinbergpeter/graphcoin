export type GetExchangeInput = {
  exchange: string;
  start: string;
  end: string;
};

export type TransformedCryptoData = {
  id: 'rate_low' | 'rate_close' | 'rate_open' | 'rate_high';
  color: string;
  data: { x: string; y: number }[];
};

export type TransformedExchangeResponse = {
  id: 'rate_low' | 'rate_close' | 'rate_open' | 'rate_high';
  color: string;
  data: {
    x: Date;
    y: number;
  }[];
}[];

export type GetScatterInput = {
  start: string;
  end: string;
};

export type ScatterChartSeries = {
  name: string; // e.g., "BTC", "ETH", "XRP"
  type: 'scatter'; // Always "scatter" for this chart
  data: [number, number][]; // Array of [price, volume] pairs
};
