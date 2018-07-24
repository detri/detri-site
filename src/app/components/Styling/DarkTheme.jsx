import React from 'react';
import { ThemeProvider } from 'styled-components';

const DarkTheme = ({ children }) => {
  return (
    <ThemeProvider theme={{
      primary: '#44a9ff',
      secondary: '#151515',
      light: '#ffffff',
      tertiary: '#19354d'
    }}>
      {children}
    </ThemeProvider>
  );
};

export default DarkTheme;
