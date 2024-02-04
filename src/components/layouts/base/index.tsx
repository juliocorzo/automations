import Head from 'next/head';
import type { ReactNode } from 'react';
import { AppHeader } from '@/components/atoms/header';

type LayoutProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

function BaseLayout({
  title, description, children,
}: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <main>
        <AppHeader />
        {children}
      </main>
    </>
  );
}

export default BaseLayout;
