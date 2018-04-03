import React from 'react';
import { ThemeProvider } from 'styled-components';

const DarkTheme = ({ children }) => {
  return (
    <ThemeProvider theme={{
      primary: '#7000CC',
      secondary: '#100015',
      light: '#ffffff',
      tertiary: '#300050'
    }}>
      {children}
    </ThemeProvider>
  );
};

export default DarkTheme;
