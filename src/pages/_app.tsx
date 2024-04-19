import type { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
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
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <ReduxProvider store={store}>
            <CssBaseline />
            <Component {...pageProps} />
          </ReduxProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </AppCacheProvider>
  );
}

export default MyApp;
