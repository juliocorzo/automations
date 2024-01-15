export const getLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return null;
  const value = window.localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

export const setLocalStorage = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
};
