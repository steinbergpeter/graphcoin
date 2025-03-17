import { useState } from 'react'
import { useLatestTrades } from '../../api/hooks'
import { LatestTradesGrid } from './aggrid'
import { Box, Button, ButtonGroup, Card, Typography } from '@mui/material'
import styles from '../../styles/styles'
import { formatDate } from './utilities'

const LatestTrades = () => {
  const [limit, setLimit] = useState<number>(20) // Placeholder for limit state, if needed
  const { data, isLoading, isError, refetch } = useLatestTrades({ limit })

  return (
    <Card sx={styles.outerCardTable}>
      {/* HEADER */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Typography variant="h6" color="primary" fontWeight="bold">
          {data && data.length
            ? `Latest ${limit} Trades as of ${formatDate(
                data[0]['Time CoinAPI']
              )}`
            : 'Latest Trades'}
        </Typography>
        <Box sx={styles.tableButtons}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={() => refetch()}
              variant="contained"
              color="primary"
              size="small"
              sx={{ boxShadow: 1 }}
            >
              Update
            </Button>

            <ButtonGroup
              variant="text"
              color="primary"
              aria-label="outlined primary button group"
              sx={{ boxShadow: 1 }}
            >
              {[10, 20, 50, 100].map((value) => (
                <Button
                  key={value}
                  variant="outlined"
                  onClick={() => setLimit(value)}
                  size="small"
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
      </Box>

      {/* MAIN */}

      {isLoading && (
        <Typography
          variant="h5"
          fontWeight="semibold"
          color="info"
          sx={{ mt: 25 }}
        >
          Loading latest trades data...
        </Typography>
      )}

      {isError && (
        <Typography
          variant="h5"
          fontWeight="semibold"
          color="warning"
          sx={{ mt: 25 }}
        >
          There has been an error accessing CoinAPI.
          <br />
          Please try again.
        </Typography>
      )}

      {data && !data?.length && (
        <Typography
          variant="h5"
          fontWeight="semibold"
          color="warning"
          sx={{ mt: 25 }}
        >
          CoinAPI is not communicating at this time.
          <br />
          Please try again.
        </Typography>
      )}

      {data?.length ? <LatestTradesGrid data={data} /> : null}
    </Card>
  )
}

export { LatestTrades }
