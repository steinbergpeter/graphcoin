import type {
  ScatterApiResponse,
  ExchangeResponse,
  LatestTradesResponse,
} from './schemas';
import type {
  TransformedScatterResponse,
  TransformedExchangeResponse,
  TransformedTradesResponse,
} from './types';

const rateTypes = ['rate_low', 'rate_close', 'rate_open', 'rate_high'] as const;
type RateType = (typeof rateTypes)[number];

const transformExchangeResponse = (
  parsedData: ExchangeResponse
): TransformedExchangeResponse => {
  return rateTypes.map((rateType: RateType, index) => ({
    id: rateType,
    color: `hsl(${(index * 90) % 360}, 70%, 50%)`,
    data: [...parsedData]
      .map((entry) => ({
        x: new Date(entry.time_period_start),
        y: entry[rateType],
      }))
      .sort((a, b) => a.x.getTime() - b.x.getTime()),
  }));
};

const transformScatterData = (
  parsedData: ScatterApiResponse
): TransformedScatterResponse => {
  const data = JSON.parse(JSON.stringify(parsedData)) as ScatterApiResponse;
  return {
    BTC: {
      name: 'BTC',
      type: 'scatter',
      data: data.BTC.map((entry) => [entry.price_close, entry.volume_traded]),
    },
    ETH: {
      name: 'ETH',
      type: 'scatter',
      data: data.ETH.map((entry) => [entry.price_close, entry.volume_traded]),
    },
    XRP: {
      name: 'XRP',
      type: 'scatter',
      data: data.XRP.map((entry) => [entry.price_close, entry.volume_traded]),
    },
  };
};

const transformLatestTrades = (
  parsedData: LatestTradesResponse
): TransformedTradesResponse => {
  return [...parsedData].map((trade) => {
    const [exchange, marketType, baseAsset, quoteAsset] =
      trade.symbol_id.split('_');

    return {
      Exchange: exchange,
      'Market Type': marketType,
      'Base Asset': baseAsset,
      'Quote Asset': quoteAsset,
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
    };
  });
};

export {
  transformExchangeResponse as transformCryptoData,
  transformScatterData,
  transformLatestTrades,
};
