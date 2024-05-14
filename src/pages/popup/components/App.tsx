import { CssVarsProvider, Sheet, Typography } from '@mui/joy';
import React from 'react';
import ToggleItem from './ToggleItem';

const App = (): JSX.Element => {
  return (
    <CssVarsProvider defaultMode="system">
      <Sheet>
        <Typography level="h1" textAlign="center">
          RHITweaks
        </Typography>
        <ToggleItem name="Moodle" />
        <ToggleItem name="Schedule lookup" />
        <ToggleItem name="Banner web" />
      </Sheet>
    </CssVarsProvider>
  );
};

export default App;
