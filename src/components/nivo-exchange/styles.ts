import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  container: {
    height: 550,
    width: '40%',
    border: 4,
    borderColor: 'primary.main',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 2,
    borderRadius: 3,
    backgroundColor: 'white',
  },
  loadingContainer: {
    height: 550,
    width: '50%',
    border: 4,
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
    marginBottom: 2,
  },
  buttonGroup: {
    display: 'flex',
    gap: 4,
  },
};

export default styles;
