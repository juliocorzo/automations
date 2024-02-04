import {
  Container, Stack, Typography,
} from '@mui/material';
import { Header } from '@/components/atoms/header/Header.styles';

export function AppHeader() {
  return (
    <Header>
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 60,
        }}
      >
        <Stack direction="row" spacing={2} marginY={2}>
          <strong>Audiobook cover downloader</strong>
          <Typography>
            Uses public-facing APIs and some trickery to force the highest resolution possible
          </Typography>
        </Stack>
      </Container>
    </Header>
  );
}

export default AppHeader;
