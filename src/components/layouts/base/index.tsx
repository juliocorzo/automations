import Head from 'next/head';
import type { ReactNode } from 'react';
import { Header } from '@/components/atoms/header';

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
        <Header title={title} description={description} />
        {children}
      </main>
    </>
  );
}

export default BaseLayout;
