import Head from 'next/head';
import type { ReactNode } from 'react';
import { Header } from '@/components/molecules/header';

type LayoutProps = {
  title: string;
  description?: string;
  breadcrumbs?: {
    title: string;
    url: string;
  }[];
  subheader?: {
    title: string;
    url: string;
  }[];
  setTheme?: (key: 'dark' | 'light') => void;
  currentThemeKey?: 'dark' | 'light';
  children?: ReactNode;
};

function BaseLayout({
  title = 'automations',
  description = 'a space for experimentation',
  breadcrumbs = [],
  subheader = [],
  setTheme = () => {},
  currentThemeKey = 'dark',
  children,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <main>
        <Header
          title={title}
          description={description}
          breadcrumbs={breadcrumbs}
          subheader={subheader}
          setTheme={setTheme}
          currentThemeKey={currentThemeKey}
        />
        {children}
      </main>
    </>
  );
}

export default BaseLayout;
