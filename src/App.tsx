import { Box, Container } from '@mui/material'
import { ScatterChart } from './components/echart-scatter'
import Header from './components/header'
import { Exchange } from './components/nivo-exchange'
import { LatestTrades } from './components/table/LatestTrades'
import styles from './styles/styles'

function App() {
  return (
    <Box sx={styles.page}>
      <Header />
      <Container sx={styles.activeArea}>
        <Exchange />
        <ScatterChart />
        <LatestTrades />
      </Container>
    </Box>
  )
}

export default App
