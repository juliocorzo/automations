import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { darkTheme, lightTheme } from '@/utilities/styles/theme';
import { store } from '@/store';

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  const [activeTheme, setActiveTheme] = useState(darkTheme);
  const [currentThemeKey, setCurrentThemeKey] = useState<'light' | 'dark' | undefined>(undefined);

  useEffect(() => {
    // Default to dark mode if user has no preference
    const hatesEyeballs = window.matchMedia('(prefers-color-scheme: light)').matches;
    const preferredTheme = hatesEyeballs ? 'light' : 'dark';
    if (currentThemeKey === undefined) {
      setCurrentThemeKey(preferredTheme);
    }
    setActiveTheme(currentThemeKey === 'light' ? lightTheme : darkTheme);
  }, [currentThemeKey]);

  const setTheme = (key: 'light' | 'dark') => {
    setCurrentThemeKey(key);
  };

  return (
    <AppCacheProvider {...props}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={activeTheme}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <ReduxProvider store={store}>
            <CssBaseline />
            <Component {...pageProps} setTheme={setTheme} currentThemeKey={currentThemeKey} />
          </ReduxProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </AppCacheProvider>
  );
}

export default MyApp;
