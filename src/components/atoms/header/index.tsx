import {
  Container, Stack, Typography,
} from '@mui/material';
import { Header as StyledHeader } from '@/components/atoms/header/Header.styles';

type HeaderProps = {
  /** Page title and main header */
  title: string;
  /** Page description */
  description?: string;
};

export function Header({ title, description }: HeaderProps) {
  return (
    <StyledHeader>
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
          <strong>{title}</strong>
          <Typography>
            {description}
          </Typography>
        </Stack>
      </Container>
    </StyledHeader>
  );
}

export default Header;
