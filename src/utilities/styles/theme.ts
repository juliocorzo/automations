import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

const commonTheme: ThemeOptions = {

};

const lightTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  ...commonTheme,
  palette: {
    mode: 'dark',
  },
});

export { lightTheme, darkTheme };
