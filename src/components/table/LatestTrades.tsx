import { useState } from 'react';
import { useLatestTrades } from '../../api/hooks';
import { LatestTradesGrid } from './aggrid';
import { Box, Button, ButtonGroup, Card, Typography } from '@mui/material';
import styles from '../../styles/styles';

const LatestTrades = () => {
  const [limit, setLimit] = useState<number>(20); // Placeholder for limit state, if needed
  const { data, isLoading, refetch } = useLatestTrades({ limit });
  const refetchData = () => refetch();

  return (
    <Card sx={styles.outerCardTable}>
      {data && (
        <Box sx={styles.tableButtons}>
          <Typography variant='h5' color='grey.800' fontWeight='bold'>
            Latest {limit} Trades as of{' '}
            {new Date(data[0]['Time CoinAPI']).toLocaleString()}
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={refetchData}
              variant='contained'
              color='primary'
              size='small'
              sx={{ boxShadow: 1 }}
            >
              Update
            </Button>

            <ButtonGroup
              variant='text'
              color='primary'
              aria-label='outlined primary button group'
              sx={{ boxShadow: 1 }}
            >
              {[10, 20, 50, 100].map((value) => (
                <Button
                  key={value}
                  variant='outlined'
                  onClick={() => setLimit(value)}
                  size='small'
                  sx={{
                    backgroundColor:
                      limit === value ? 'primary.main' : 'transparent',
                    color: limit === value ? 'white' : 'inherit',
                  }}
                >
                  {value}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Box>
      )}

      {data && data.length === 0 && (
        <Typography variant='h5' fontWeight='semibold' color='primary'>
          No trades available
        </Typography>
      )}

      {isLoading && (
        <Typography variant='h5' fontWeight='semibold' color='primary'>
          Loading...
        </Typography>
      )}

      <LatestTradesGrid data={data} />
    </Card>
  );
};

export { LatestTrades };
