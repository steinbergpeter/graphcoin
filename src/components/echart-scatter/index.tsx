import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import { useScatterData } from '../../api/hooks';
import { MyScatter } from './my-scatter';
import styles from './styles';

const ScatterChart = () => {
  const end = useMemo(() => new Date().toISOString(), []);
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 13;
  const maxYear = currentYear;
  const [startYear, setStartYear] = useState(maxYear);
  const start = useMemo(
    () => new Date(startYear, 0, 1).toISOString(),
    [startYear]
  );
  const { data, isLoading, isError, error } = useScatterData({ start, end });

  return (
    <>
      <Box sx={styles.container}>
        <Typography variant='h5' fontWeight='bold' color='primary'>
          Volume vs. Price for BTC, ETH, XRP
        </Typography>

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

        {/* Year Selection Buttons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            marginBottom: 1,
          }}
        >
          <Button
            variant='contained'
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
            variant='contained'
            color='primary'
            size='small'
            onClick={() => setStartYear((prev) => Math.min(prev + 1, maxYear))}
            disabled={startYear >= maxYear} // Disable when reaching maxYear
          >
            ▶
          </Button>
        </Box>
      </Box>
    </>
  );
};

export { ScatterChart };
