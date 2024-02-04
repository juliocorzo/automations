import type { ReactNode } from 'react';
import { Container } from '@mui/material';
import Base from '@/components/layouts/base';

type LayoutProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

function HomeLayout({ title, description, children }: LayoutProps) {
  return (
    <Base title={title} description={description}>
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        {children}
      </Container>
    </Base>
  );
}

export default HomeLayout;
