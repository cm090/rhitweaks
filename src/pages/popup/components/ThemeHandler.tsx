import { CssBaseline } from '@mui/joy';
import {
  CssVarsProvider,
  extendTheme,
  getInitColorSchemeScript,
} from '@mui/joy/styles';
import React, { ReactNode, useEffect } from 'react';
import App from './App';

const ThemeHandler = (): ReactNode => {
  const setColorScheme = () => {
    const themeColor = window.matchMedia?.('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    document.documentElement.setAttribute('data-joy-color-scheme', themeColor);
  };

  const theme = extendTheme({
    colorSchemes: {
      light: {
        palette: {
          primary: {
            50: '#ffffff',
            100: '#f5f3f4',
            200: '#d3d3d3',
            300: '#b1a7a6',
            400: '#e5383b',
            500: '#ba181b',
            600: '#a4161a',
            700: '#660708',
            800: '#161a1d',
            900: '#0b090a',
          },
        },
      },
      dark: {
        palette: {
          primary: {
            50: '#ffffff',
            100: '#f5f3f4',
            200: '#d3d3d3',
            300: '#b1a7a6',
            400: '#e5383b',
            500: '#ba181b',
            600: '#a4161a',
            700: '#660708',
            800: '#161a1d',
            900: '#0b090a',
          },
        },
      },
    },
  });

  useEffect(() => setColorScheme(), []);

  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      <LightDarkTheme>
        <App />
      </LightDarkTheme>
    </CssVarsProvider>
  );
};

const LightDarkTheme = ({ children }: { children: React.ReactNode }) => {
  getInitColorSchemeScript();
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
};

export default ThemeHandler;
