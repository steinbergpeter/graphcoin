import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import type { ScatterChartSeries } from '../../api/types';
import { Box } from '@mui/material';
import styles from '../../styles/styles';

type MyScatterProps = {
  data:
    | {
        BTC: ScatterChartSeries;
        ETH: ScatterChartSeries;
        XRP: ScatterChartSeries;
      }
    | undefined;
};

const MyScatter = ({ data }: MyScatterProps) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current, undefined, {
        renderer: 'canvas',
      });
    }
  }, []);

  useEffect(() => {
    if (!data || !chartInstance.current) return;

    const options = {
      tooltip: { trigger: 'item' },
      xAxis: {
        type: 'log',
        name: 'Price Close',
        nameLocation: 'middle',
        nameGap: 30,
        max: 130000,
      },
      yAxis: {
        type: 'log',
        name: 'Volume Traded',
        nameLocation: 'middle',
        nameGap: 40,
        axisLabel: {
          formatter: (value: number) => `10^${Math.log10(value).toFixed(0)}`,
        },
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

    chartInstance.current.setOption(options, {
      notMerge: true,
      lazyUpdate: true,
    });
  }, [data]);

  useEffect(() => {
    if (!chartRef.current) return;
    const observer = new ResizeObserver(() => {
      if (chartInstance.current) {
        chartInstance.current.resize();
      }
    });

    observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, []);

  return <Box sx={styles.scatterGraphHolder} ref={chartRef} />;
};

export { MyScatter };
