import React from 'react';
import { createRoot } from 'react-dom/client';
import ThemeHandler from './components/ThemeHandler';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeHandler />
  </React.StrictMode>,
);
