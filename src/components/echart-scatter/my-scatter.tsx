import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useScatterData } from '../../api/hooks';

const MyScatter = () => {
  const start = '2025-03-01T00:00:00Z';
  const end = '2025-03-12T00:00:00Z';

  const { data, isLoading, isError, error } = useScatterData({ start, end });
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current, undefined, {
        renderer: 'canvas',
      });
    }

    if (data) {
      const options = {
        title: { text: 'Scatter Chart of Crypto Trading Volume and Price' },
        tooltip: { trigger: 'item' },
        xAxis: {
          type: 'value',
          name: 'Price Close',
          nameLocation: 'middle',
          nameGap: 30,
        },
        yAxis: {
          type: 'value',
          name: 'Volume Traded',
          nameLocation: 'middle',
          nameGap: 40,
        },
        series: [
          {
            name: 'BTC',
            type: 'scatter',
            data: data.BTC.data.map((item) => [item[0], item[1]]),
            itemStyle: { color: '#FF5733' },
          },
          {
            name: 'ETH',
            type: 'scatter',
            data: data.ETH.data.map((item) => [item[0], item[1]]),
            itemStyle: { color: '#4285F4' },
          },
          {
            name: 'XRP',
            type: 'scatter',
            data: data.XRP.data.map((item) => [item[0], item[1]]),
            itemStyle: { color: '#FFC300' },
          },
        ],
      };
      chartInstance.current.setOption(options);
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, [data]);

  if (isLoading) return <p>Loading scatter data...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  return (
    <div
      ref={chartRef}
      style={{ width: '100%', height: '400px', backgroundColor: '' }}
    />
  );
};

export { MyScatter };
