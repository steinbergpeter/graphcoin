import { useLatestTrades } from '../../api/hooks';
import { LatestTradesGrid } from './aggrid';
import { Box } from '@mui/material';

const LatestTrades = () => {
  const { data } = useLatestTrades({ limit: 10 }); // Example usage of the hook, adjust as needed

  return (
    <Box
      sx={{
        width: '82%',
        height: '45vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'primary.main',
        borderRadius: '10px',
        padding: '4px',
      }}
    >
      <LatestTradesGrid data={data} />
    </Box>
  );
};

export { LatestTrades };
