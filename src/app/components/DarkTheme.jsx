import React from 'react';
import { ThemeProvider } from 'styled-components';

const DarkTheme = ({ children }) => {
  return (
    <ThemeProvider theme={{
      primary: '#500090',
      secondary: '#100015',
      light: '#ffffff',
      tertiary: '#300050'
    }}>
      {children}
    </ThemeProvider>
  );
};

export default DarkTheme;
