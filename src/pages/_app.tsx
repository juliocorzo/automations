import type { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import { darkTheme } from '@/utilities/styles/theme';
import { store } from '@/store';

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <ReduxProvider store={store}>
          <CssBaseline />
          <Component {...pageProps} />
        </ReduxProvider>
      </ThemeProvider>
    </AppCacheProvider>
  );
}

export default MyApp;
