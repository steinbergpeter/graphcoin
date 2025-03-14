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

//TABLE

export type TransformedTrade = {
  Exchange: string; // ✅ Extracted from symbol_id
  'Market Type': string; // ✅ Extracted from symbol_id
  'Base Asset': string; // ✅ Extracted from symbol_id
  'Quote Asset': string; // ✅ Extracted from symbol_id
  'Time Exchange': string; // ✅ Formatted timestamp
  'Time CoinAPI': string; // ✅ Formatted timestamp
  ID: string; // ✅ Trade UUID
  Price: string; // ✅ Formatted as USD currency
  Size: number; // ✅ Trade size
  'Taker Side': string; // ✅ BUY/SELL
};

export type TransformedLatestTrades = TransformedTrade[];
