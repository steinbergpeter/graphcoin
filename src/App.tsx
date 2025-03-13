import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
// import { Exchange } from './components/nivo-exchange';
import { ScatterChart } from './components/echart-scatter';

function App() {
  return (
    <Container
      sx={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        gap: '2em',
        padding: '1em',
      }}
    >
      <Typography variant='h3'>GraphCoin!</Typography>

      {/* <Exchange /> */}
      <ScatterChart />
    </Container>
  );
}

export default App;
