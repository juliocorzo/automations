import type { ReactNode } from 'react';
import { Container } from '@mui/material';
import Base from '@/components/layouts/base';

type DashboardLayoutProps = {
  /** Page title and main header */
  title: string;
  /** Page description */
  description?: string;
  /** Theme control callback */
  setTheme?: (key: 'dark' | 'light') => void;
  currentThemeKey?: 'dark' | 'light';
  breadcrumbs?: {
    title: string;
    url: string;
  }[];
  subheader?: {
    title: string;
    url: string;
  }[];
  children?: ReactNode;
};

function DashboardLayout({
  title,
  description,
  children,
  breadcrumbs = [],
  subheader = [],
  setTheme = () => {},
  currentThemeKey = 'dark',
}: DashboardLayoutProps) {
  return (
    <Base
      title={title}
      description={description}
      setTheme={setTheme}
      currentThemeKey={currentThemeKey}
      breadcrumbs={breadcrumbs}
      subheader={subheader}
    >
      <Container maxWidth={false} sx={{ paddingLeft: { xs: 0 }, paddingRight: { xs: 0 } }}>
        {children}
      </Container>
    </Base>
  );
}

export default DashboardLayout;
export { DashboardLayout };
