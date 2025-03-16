import { Box, Button, ButtonGroup, Card, Typography } from '@mui/material';
import { useState, type MouseEvent } from 'react';
import { useExchange } from '../../api/hooks';
import styles from '../../styles/styles';
import { MyResponsiveLine } from './my-responsive-line';
import { capitalizeFirstLetter, getPastDate } from './utilities';

const Exchange = () => {
  const today = new Date().toISOString();
  const [period, setPeriod] = useState<'WEEK' | 'MONTH' | 'YEAR'>('WEEK');

  const dateOptions = {
    WEEK: getPastDate(7),
    MONTH: getPastDate(30),
    YEAR: getPastDate(365),
  };

  const [input, setInput] = useState({
    exchange: 'BTC',
    start: dateOptions.WEEK,
    end: today,
  });

  const updateExchange = (e: MouseEvent<HTMLButtonElement>) => {
    setInput((prev) => ({ ...prev, exchange: e.currentTarget.name }));
  };

  const updatePeriod = (e: MouseEvent<HTMLButtonElement>) => {
    const newPeriod = e.currentTarget.name as keyof typeof dateOptions;
    setPeriod(newPeriod);
    setInput((prev) => ({ ...prev, start: dateOptions[newPeriod] }));
  };

  const { data, isLoading, isError } = useExchange(input);

  return (
    <Card sx={styles.outerCardGraph}>
      {/* HEADER */}
      <Typography variant='h6' fontWeight='bold' color='primary'>
        {input.exchange} Value Over Past {capitalizeFirstLetter(period)}
      </Typography>

      {/* MAIN */}
      <Box sx={styles.chartWrapper}>
        {isLoading ? (
          <Typography variant='h6' fontWeight='semibold' color='info'>
            Loading exchange data...
          </Typography>
        ) : isError || !data ? (
          <Typography variant='h6' fontWeight='semibold' color='warning'>
            There has been an error accessing CoinAPI.
            <br />
            Please try again.
          </Typography>
        ) : !data[0] ? (
          <Typography variant='h6' fontWeight='semibold' color='warning'>
            CoinAPI is not communicating at this time.
            <br />
            Please try again.
          </Typography>
        ) : (
          <MyResponsiveLine data={data} period={period} />
        )}
      </Box>

      {/* FOOTER */}
      <Box sx={styles.buttonBox}>
        <ButtonGroup variant='contained' aria-label='Exchange selection'>
          {['BTC', 'ETH', 'XRP'].map((coin) => (
            <Button
              key={coin}
              name={coin}
              onClick={updateExchange}
              size='small'
              sx={{
                backgroundColor:
                  coin === input.exchange ? 'primary.main' : 'transparent',
                color: coin === input.exchange ? 'white' : 'inherit',
              }}
            >
              {coin}
            </Button>
          ))}
        </ButtonGroup>

        <ButtonGroup variant='contained' aria-label='Date range selection'>
          {Object.keys(dateOptions).map((dateOpt) => (
            <Button
              key={dateOpt}
              name={dateOpt}
              onClick={updatePeriod}
              size='small'
              sx={{
                backgroundColor:
                  dateOpt === period ? 'primary.main' : 'transparent',
                color: dateOpt === period ? 'white' : 'inherit',
              }}
            >
              {dateOpt}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Card>
  );
};

export { Exchange };
