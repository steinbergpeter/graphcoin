import { Container } from '@mui/material';
import { useLatestTrades } from './api/hooks';
import { ScatterChart } from './components/echart-scatter';
import Header from './components/header';
import { Exchange } from './components/nivo-exchange';
import { LatestTrades } from './components/table/LatestTrades';
import styles from './styles/styles';

function App() {
  const { data } = useLatestTrades({ limit: 30 });
  console.log({ tradesData: data });
  return (
    <main className='w-full min-h-screen flex justify-around items-baseline gap-6 bg-amber-300'>
      <Header className='w-full fixed bg-color-blue z-10' />
      <Container sx={styles.activeArea}>
        <Exchange />
        <ScatterChart />
        <LatestTrades />
      </Container>
    </main>
  );
}

export default App;
