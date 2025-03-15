import { Box, Container, Typography } from '@mui/material';

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
      <Container maxWidth='lg' sx={{ padding: 1 }}>
        <Typography variant='h4' color='white' fontWeight='bold'>
          GRAPHCOIN
        </Typography>
      </Container>
    </Box>
  );
};

export default Header;
