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
  const { data, isLoading, isError, error } = useScatterData({ start });

  return (
    <>
      <Card sx={styles.outerCardGraph}>
        {/* HEADER */}
        <Typography variant='h5' fontWeight='bold' color='primary'>
          Volume vs. Price for BTC, ETH, XRP
        </Typography>

        {/* MAIN */}
        {isLoading ? (
          <div
            style={{
              width: '100%',
              height: '450px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography variant='h5' fontWeight='semibold' color='primary'>
              Loading scatter data...
            </Typography>
          </div>
        ) : isError ? (
          <p>Error: {error?.message}</p>
        ) : data ? (
          <MyScatter data={data} />
        ) : (
          <p>Unable to render Scatter Chart</p>
        )}

        {/* FOOTER */}
        <Box sx={styles.yearSelector}>
          <Button
            variant='outlined'
            color='primary'
            size='small'
            onClick={() => setStartYear((prev) => Math.max(prev - 1, minYear))}
            disabled={startYear <= minYear} // Disable when reaching minYear
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
            disabled={startYear >= maxYear} // Disable when reaching maxYear
          >
            ▶
          </Button>
        </Box>
      </Card>
    </>
  );
};

export { ScatterChart };
