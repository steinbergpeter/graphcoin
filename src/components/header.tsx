import { Box, Container, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from '../styles/styles';

const Header = () => {
  return (
    <Box
      sx={styles.header} // Use the header style from styles.ts
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
