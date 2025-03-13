import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    height: 550,
    width: '100%',
    border: 4,
    borderColor: 'primary.main',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 3,
  },
  loadingContainer: {
    height: 550,
    width: '100%',
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
    width: '80%',
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
