import { useQuery } from '@tanstack/react-query';
import type {
  GetExchangeInput,
  ScatterChartSeries,
  GetScatterInput,
} from './types';
import { getExchange, getScatter } from './getters';

const useExchange = ({ exchange, start, end }: GetExchangeInput) => {
  const query = useQuery({
    queryKey: ['exchanges', exchange, start, end],
    queryFn: () => getExchange({ exchange, start, end }),
    retry: 2,
    retryDelay: (attempt) => 1000 * attempt,
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
  };
};

const useScatterData = ({ start, end }: GetScatterInput) => {
  const query = useQuery<
    {
      BTC: ScatterChartSeries;
      ETH: ScatterChartSeries;
      XRP: ScatterChartSeries;
    },
    Error
  >({
    queryKey: ['scatter', start, end],
    queryFn: () => getScatter({ start, end }),
    retry: 2,
    retryDelay: (attempt) => 1000 * attempt,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
  };
};

export { useExchange, useScatterData };
