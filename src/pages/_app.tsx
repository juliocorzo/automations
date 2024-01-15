import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import { lightTheme, darkTheme } from '@/utilities/styles/theme';
import { getLocalTheme, setLocalTheme } from '@/utilities/styles/utilities';
import type { ThemeKey } from '@/utilities/styles/utilities';
import { store } from '@/store';

const MyApp = (props: AppProps) => {
  const { Component, pageProps } = props;

  const [themeKey, setThemeKey] = useState<ThemeKey>('dark');

  useEffect(() => {
    const localTheme = getLocalTheme();
    if (!localTheme) {
      setThemeKey('light');
      setLocalTheme('light');
    }
  }, []);

  const setTheme = (key: ThemeKey) => {
    setThemeKey(key);
  };

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={themeKey === 'light' ? lightTheme : darkTheme}>
        <ReduxProvider store={store}>
          <CssBaseline />
          <Component {...pageProps} setTheme={setTheme} />
        </ReduxProvider>
      </ThemeProvider>
    </AppCacheProvider>
  );
};

export default MyApp;
