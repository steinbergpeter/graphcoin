import { Box } from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import styles from '../../styles/styles';

type Props = {
  data: {
    id: 'rate_close' | 'rate_high' | 'rate_low' | 'rate_open';
    color: string;
    data: {
      x: Date;
      y: number;
    }[];
  }[];
  period: 'WEEK' | 'MONTH' | 'YEAR';
};

const MyResponsiveLine = ({ data, period }: Props) => {
  console.log('Exchange data:', data); // Debugging line to check the fetched data

  const tickSpacing =
    period === 'YEAR'
      ? 'every month'
      : period === 'MONTH'
      ? 'every week'
      : 'every 2 days';

  return (
    <Box sx={styles.lineGraphHolder}>
      <ResponsiveLine
        data={data}
        margin={{ top: 30, right: 30, bottom: 50, left: 75 }}
        xScale={{
          type: 'time',
          precision: 'day',
          min: 'auto',
          max: 'auto',
        }}
        xFormat='time:%Y-%m-%d'
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: '%b %d',
          tickValues: tickSpacing,
          legendOffset: 36,
          legendPosition: 'middle',
        }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: (value) =>
            `$ ${new Intl.NumberFormat('en-US').format(value)}`,
          legendOffset: -80,
          legendPosition: 'middle',
        }}
        tooltip={({ point }) => (
          <div
            style={{
              background: 'white',
              padding: '6px',
              borderRadius: '4px',
              boxShadow: '0px 2px 5px rgba(0,0,0,0.2)',
              fontSize: '14px',
              border: `2px solid ${point.serieColor}`,
            }}
          >
            <strong style={{ color: point.serieColor }}>{point.serieId}</strong>
            <br />
            Date: {new Date(point.data.x).toLocaleDateString()} <br />
            Value: <strong>${point.data.yFormatted}</strong>
          </div>
        )}
        enableSlices='x'
      />
    </Box>
  );
};

export { MyResponsiveLine };
