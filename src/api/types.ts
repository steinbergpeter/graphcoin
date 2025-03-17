// EXCHANGE
export type GetExchangeInput = {
  exchange: string
  start: string
  end: string
}

export type TransformedExchangeData = {
  id: 'rate_low' | 'rate_close' | 'rate_open' | 'rate_high'
  color: string
  data: {
    x: Date
    y: number
  }[]
}

export type TransformedExchangeResponse = Array<TransformedExchangeData>

// SCATTER

export type GetScatterInput = {
  start: string
}

export type TransformedScatterData = {
  name: string
  type: 'scatter'
  data: [number, number][]
}

export type TransformedScatterResponse = {
  BTC: TransformedScatterData
  ETH: TransformedScatterData
  XRP: TransformedScatterData
}

//TABLE

export type TransformedTrade = {
  Exchange: string
  'Market Type': string
  'Base Asset': string
  'Quote Asset': string
  'Time Exchange': string
  'Time CoinAPI': string
  ID: string
  Price: string
  Size: number
  'Taker Side': string
}

export type TransformedTradesResponse = TransformedTrade[]
