import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import { useState, type MouseEvent } from 'react';
import { useExchange } from '../../api/hooks';
import { getPastDate } from './helpers';
import { MyResponsiveLine } from './my-responsive-line';
import styles from './styles';

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

  if (isLoading || isError || !data)
    return (
      <Box sx={styles.loadingContainer}>
        <Typography variant='h5' fontWeight='bold' color='primary'>
          {isError ? 'There has been an error accessing CoinAPI' : 'Loading...'}
        </Typography>
      </Box>
    );

  return (
    <Box sx={styles.container}>
      <Typography variant='h5' fontWeight='bold' color='primary'>
        {input.exchange} Value Over Past {period}
      </Typography>

      <Box sx={styles.chartWrapper}>
        <MyResponsiveLine data={data} period={period} />
      </Box>

      <Box sx={styles.buttonGroup}>
        <ButtonGroup variant='contained' aria-label='Exchange selection'>
          {['BTC', 'ETH', 'XRP'].map((coin) => (
            <Button key={coin} name={coin} onClick={updateExchange}>
              {coin}
            </Button>
          ))}
        </ButtonGroup>

        <ButtonGroup variant='contained' aria-label='Date range selection'>
          {Object.keys(dateOptions).map((period) => (
            <Button key={period} name={period} onClick={updatePeriod}>
              {period}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
    </Box>
  );
};

export { Exchange };
