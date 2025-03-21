import type { SxProps, Theme } from '@mui/material/styles';

const styles: Record<string, SxProps<Theme>> = {
  // PAGE
  page: {
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    gap: 6,
  },
  headerOuter: {
    backgroundColor: 'primary.dark',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70px',
    width: '100%',
    position: 'fixed',
    zIndex: 10,
  },
  headerInner: {
    padding: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerGitHub: { color: 'white', fontSize: 30, cursor: 'pointer' },
  activeArea: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 2,
    maxWidth: '100%',
    overflow: 'hidden',
    height: 'full',
    marginTop: 9,
    padding: 1,
  },
  outerCardGraph: {
    flex: '2 1 300px',
    minWidth: '520px',
    maxWidth: '600px',
    height: '585px',
    padding: 1,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  //TABLE
  outerCardTable: {
    flex: '2 1 550px',
    minWidth: '550px',
    maxWidth: '1200px',
    height: '585px',
    padding: 2,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.4)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'center',
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
  // LINE CHART
  buttonBox: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline',
    mb: '2px',
  },
  lineGraphHolder: {
    width: '550px',
    height: '480px',
  },
  chartWrapper: {
    width: '100%',
    height: '450px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // SCATTER CHART
  scatterGraphHolder: {
    width: '600px',
    height: '500px',
    paddingLeft: '30px',
  },
  yearSelector: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  ScatterHeadline: {
    width: '100%',
    height: '450px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default styles;
