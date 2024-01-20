import {
  Container, Box, Stack,
} from '@mui/material';
import { Header } from '@/components/atoms/header/Header.styles';

export const AppHeader = () => (
  <Header>
    <Container sx={{ display: 'flex', alignItems: 'center', minHeight: 60 }}>
      <Box sx={{ ml: 'auto' }} />
      <Stack direction="row" spacing={1} />
    </Container>
  </Header>
);

export default AppHeader;
