import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    width: '40%',
    height: 550,
    border: 4,
    borderColor: 'primary.main',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  loadingContainer: {
    width: '50%',
    height: 550,
    border: 4,
    backgroundColor: 'green',
    borderColor: 'primary.main',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 3,
  },
  chartWrapper: {
    width: '100%',
    height: 420,
    marginBottom: 0,
    backgroundColor: 'pink',
  },
  buttonGroup: {
    display: 'flex',
    gap: 4,
  },
};

export default styles;
