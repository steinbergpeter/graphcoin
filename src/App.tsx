import { Box } from '@mui/material';
import { Exchange } from './components/nivo-exchange';
import { ScatterChart } from './components/echart-scatter';
import Header from './components/header';
import { LatestTrades } from './components/table/LatestTrades';
import { useLatestTrades } from './api/hooks';

function App() {
  const { data } = useLatestTrades({ limit: 20 });
  console.log({ tradesData: data });
  return (
    <main className='bg-slate-200 w-full min-h-screen flex justify-around items-baseline gap-6'>
      <Header className='w-full fixed bg-color-blue z-10' />
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'start',
          gap: '2em',
          paddingTop: '6em',
        }}
      >
        <Box
          sx={{
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'start',
            gap: '2em',
            flexWrap: 'wrap',
          }}
        >
          <Exchange />
          <ScatterChart />
          <LatestTrades />
        </Box>
      </Box>
    </main>
  );
}

export default App;
