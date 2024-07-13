import React from 'react';
import { createRoot } from 'react-dom/client';
import ThemeHandler from './components/ThemeHandler';

const requestHostPermissions = () => {
  chrome.permissions.request({
    origins: [
      'https://moodle.rose-hulman.edu/*',
      'https://prodwebxe-hv.rose-hulman.edu/*',
      'https://prodwebxe7-hv.rose-hulman.edu/*',
      'https://bannerssb.rose-hulman.edu/*',
      'https://print.rhit.cf/*',
      'https://print.rose-hulman.edu:9192/*',
    ],
  });
};

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeHandler />
  </React.StrictMode>,
);

requestHostPermissions();
