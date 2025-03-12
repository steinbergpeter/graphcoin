import { queryExchange, queryScatter } from './queries';
import { transformCryptoData, transformScatterData } from './transformers';
import type {
  GetExchangeInput,
  GetScatterInput,
  ScatterChartSeries,
} from './types';
import { validateCryptoData, validateScatterData } from './validators';

const getExchange = async ({ exchange, start, end }: GetExchangeInput) => {
  try {
    const rawApiData: unknown = await queryExchange({ exchange, start, end });
    const validatedApiData = validateCryptoData(rawApiData);
    const transformedData = transformCryptoData(validatedApiData);
    return transformedData;
  } catch (error) {
    console.log((error as Error).message);
  }
};

const getScatter = async ({
  start,
  end,
}: GetScatterInput): Promise<ScatterChartSeries[]> => {
  try {
    const rawApiData: unknown = await queryScatter({ start, end });
    const validatedApiData = validateScatterData(rawApiData);
    const transformedData = transformScatterData(validatedApiData);
    return transformedData;
  } catch (error) {
    console.log((error as Error).message);
    return [];
  }
};

export { getExchange, getScatter };
