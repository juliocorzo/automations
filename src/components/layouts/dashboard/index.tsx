import type { ReactNode } from 'react';
import { Container } from '@mui/material';
import Base from '@/components/layouts/base';

type DashboardLayoutProps = {
  /** Page title and main header */
  title: string;
  /** Page description */
  description?: string;
  children?: ReactNode;
};

function DashboardLayout({
  title, description, children,
}: DashboardLayoutProps) {
  return (
    <Base title={title} description={description}>
      <Container maxWidth={false} sx={{ marginTop: 2 }}>
        {children}
      </Container>
    </Base>
  );
}

export default DashboardLayout;
