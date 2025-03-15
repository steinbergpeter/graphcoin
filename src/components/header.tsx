import { Box, Container, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import styles from '../styles/styles';

const Header = () => {
  return (
    <Box sx={styles.headerOuter}>
      <Container maxWidth='lg' sx={styles.headerInner}>
        <Typography variant='h4' color='white' fontWeight='bold'>
          GRAPHCOIN
        </Typography>
        <a
          href='https://github.com/steinbergpeter/graphcoin'
          target='_blank'
          rel='noopener noreferrer'
        >
          <GitHubIcon sx={styles.headerGitHub} />
        </a>
      </Container>
    </Box>
  );
};

export default Header;
