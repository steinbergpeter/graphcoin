import { queryExchange, queryLatestTrades, queryScatter } from './queries'
import {
  transformCryptoData,
  transformLatestTrades,
  transformScatterData,
} from './transformers'
import type {
  GetExchangeInput,
  GetScatterInput,
  TransformedExchangeResponse,
  TransformedTradesResponse,
  TransformedScatterResponse,
} from './types'
import { validator } from './validator'
import {
  exchangeResponseSchema,
  LatestTradesResponseSchema,
  scatterApiResponseSchema,
  type LatestTradesInput,
  // type LatestTradesResponse,
} from './schemas'

const getExchange = async ({
  exchange,
  start,
  end,
}: GetExchangeInput): Promise<TransformedExchangeResponse> => {
  try {
    const rawApiData: unknown = await queryExchange({
      exchange,
      start,
      end,
    })
    const validatedApiData = validator(rawApiData, exchangeResponseSchema)
    const transformedData = transformCryptoData(validatedApiData)
    return transformedData
  } catch (error) {
    console.log('getExchange: ', (error as Error).message)
    return []
  }
}

const getScatter = async ({
  start,
}: GetScatterInput): Promise<TransformedScatterResponse> => {
  try {
    const rawApiData: unknown = await queryScatter({ start })
    const validatedApiData = validator(rawApiData, scatterApiResponseSchema)
    const transformedData = transformScatterData(validatedApiData)
    return transformedData
  } catch (error) {
    console.log('getScatter: ', (error as Error).message)
    return {
      BTC: { name: 'BTC', type: 'scatter', data: [] },
      ETH: { name: 'ETH', type: 'scatter', data: [] },
      XRP: { name: 'XRP', type: 'scatter', data: [] },
    }
  }
}

const getLatestTrades = async ({
  limit,
}: LatestTradesInput): Promise<TransformedTradesResponse> => {
  try {
    const rawApiData: unknown = await queryLatestTrades({ limit })
    const validatedApiData = validator(rawApiData, LatestTradesResponseSchema)
    const transformedData = transformLatestTrades(validatedApiData)
    return transformedData
  } catch (error) {
    console.log('getTrades: ', (error as Error).message)
    return []
  }
}

export { getExchange, getScatter, getLatestTrades }
