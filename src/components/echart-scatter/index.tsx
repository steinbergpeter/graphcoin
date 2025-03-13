import Box from '@mui/material/Box';
import { MyScatter } from './my-scatter';
import styles from './styles';

const ScatterChart = () => {
  return (
    <Box sx={styles.container}>
      <MyScatter />
    </Box>
  );
};

export { ScatterChart };
