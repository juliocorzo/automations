import type { CreateStyled } from '@emotion/styled';
import { getLocalStorage, setLocalStorage } from '@/utilities/local-storage';

const withTransientProps: Parameters<CreateStyled>[1] = {
  shouldForwardProp: (propName: string) => !propName.startsWith('$'),
};

export type ThemeKey = 'light' | 'dark' | null;

// const getLocalTheme = () => {
//   const localTheme: ThemeKey = getLocalStorage('theme');
//   return localTheme;
// };

// const setLocalTheme = (theme: ThemeKey) => {
//   setLocalStorage('theme', theme);
// };

const getLocalTheme = () => {
  try {
    const localTheme: ThemeKey = getLocalStorage('theme');
    return localTheme;
  } catch (error) {
    return null;
  }
};

const setLocalTheme = (theme: ThemeKey): void => {
  setLocalStorage('theme', theme);
};

export { withTransientProps, getLocalTheme, setLocalTheme };
