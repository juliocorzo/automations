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

const DashboardLayout = ({ title, description, children }: DashboardLayoutProps) => (
  <Base title={title} description={description}>
    <Container maxWidth="xl" sx={{ marginTop: 4 }}>
      {children}
    </Container>
  </Base>
);

export default DashboardLayout;
