import { Box, Button, Card, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useScatterData } from '../../api/hooks';
import styles from '../../styles/styles';
import { MyScatter } from './my-scatter';

const ScatterChart = () => {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 13;
  const maxYear = currentYear;
  const [startYear, setStartYear] = useState(maxYear);
  const start = useMemo(
    () => new Date(startYear, 0, 1).toISOString(),
    [startYear]
  );
  const { data, isLoading, isError } = useScatterData({ start });

  return (
    <Card sx={styles.outerCardGraph}>
      {/* HEADER */}
      <Typography variant='h6' fontWeight='bold' color='primary'>
        Volume vs. Price for BTC, ETH, XRP
      </Typography>

      {/* MAIN */}
      <Box sx={styles.ScatterHeadline}>
        {isLoading ? (
          <Typography variant='h6' fontWeight='semibold' color='info'>
            Loading scatter data...
          </Typography>
        ) : isError || !data ? (
          <Typography variant='h6' fontWeight='semibold' color='warning'>
            There has been an error accessing CoinAPI.
            <br />
            Please try again.
          </Typography>
        ) : !data.BTC.data[0] && !data.ETH.data[0] && !data.XRP.data[0] ? (
          <Typography variant='h6' fontWeight='semibold' color='warning'>
            CoinAPI is not communicating at this time.
            <br />
            Please try again.
          </Typography>
        ) : (
          <MyScatter data={data} />
        )}
      </Box>

      {/* FOOTER */}
      <Box sx={styles.yearSelector}>
        <Button
          variant='outlined'
          color='primary'
          size='small'
          onClick={() => setStartYear((prev) => Math.max(prev - 1, minYear))}
          disabled={startYear <= minYear}
          sx={{ boxShadow: 1 }}
        >
          ◀
        </Button>

        <Typography variant='h5' fontWeight='bold' color='primary'>
          {startYear}
        </Typography>

        <Button
          variant='outlined'
          color='primary'
          size='small'
          onClick={() => setStartYear((prev) => Math.min(prev + 1, maxYear))}
          disabled={startYear >= maxYear}
          sx={{ boxShadow: 1 }}
        >
          ▶
        </Button>
      </Box>
    </Card>
  );
};

export { ScatterChart };
