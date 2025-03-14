import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  activeArea: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 2,
    maxWidth: '100%',
    overflow: 'hidden',
    backgroundColor: 'red',
    height: '93vh',
    marginTop: 9,
    padding: 1,
  },
  outerCardGraph: {
    flex: '1 1 300px',
    minWidth: '400px',
    maxWidth: '600px',
    height: '585px',
    padding: 2,
    boxShadow: 3,
  },
  outerCardTable: {
    flex: '2 1 600px',
    minWidth: '1000px',
    maxWidth: '1200px',
    height: '585px',
    padding: 2,
    boxShadow: 3,
  },
  tableHolder: {
    width: '100%',
    height: '500px',
    borderRadius: '8px',
    backgroundColor: 'green',
  },
  tableButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    mb: 2,
  },
};

export default styles;
