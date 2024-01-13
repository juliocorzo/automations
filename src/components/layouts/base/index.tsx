import Head from 'next/head';
import type { ReactNode } from 'react';

type LayoutProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

const BaseLayout = ({ title, description, children }: LayoutProps) => (
  <>
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
    </Head>
    <main>
      {children}
    </main>
  </>
);

export default BaseLayout;
