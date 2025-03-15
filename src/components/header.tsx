import { Box, Container, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

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
      <Container
        maxWidth='lg'
        sx={{
          padding: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h4' color='white' fontWeight='bold'>
          GRAPHCOIN
        </Typography>
        <a
          href='https://github.com/steinbergpeter/graphcoin'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GitHubIcon
            sx={{ color: 'white', fontSize: 30, cursor: 'pointer' }}
          />
        </a>
      </Container>
    </Box>
  );
};

export default Header;
