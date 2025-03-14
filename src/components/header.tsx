import { Box, Typography } from '@mui/material';

const Header = ({ className }: { className: string }) => {
  return (
    <Box
      sx={{
        backgroundColor: 'blue',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70px',
      }}
      className={className}
    >
      <Typography variant='h4' color='white' fontWeight='semibold'>
        GraphCoin
      </Typography>
    </Box>
  );
};

export default Header;
