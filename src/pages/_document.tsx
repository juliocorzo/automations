import {
  Html, Head, Main, NextScript,
} from 'next/document';
import type { DocumentProps, DocumentContext } from 'next/document';
import { DocumentHeadTags, documentGetInitialProps } from '@mui/material-nextjs/v14-pagesRouter';
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v14-pagesRouter';
import newrelic from 'newrelic';
import { lightTheme } from '@/utilities/styles/theme';

function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content={lightTheme.palette.primary.main} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);

  // https://github.com/newrelic/newrelic-node-examples/issues/230
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (!newrelic.agent.collector.isConnected()) {
    await new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newrelic.agent.on('connected', resolve);
    });
  }

  const browserTimingHeader = newrelic.getBrowserTimingHeader({
    hasToRemoveScriptWrapper: true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    allowTransactionlessInjection: true,
  });

  return {
    ...finalProps,
    browserTimingHeader,
  };
};

export default MyDocument;
