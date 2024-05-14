import { Sheet, Typography } from '@mui/joy';
import React from 'react';
import ToggleItem from './ToggleItem';

const App = (): JSX.Element => {
  return (
    <Sheet>
      <Typography level="h2" textAlign="center">
        RHITweaks
      </Typography>
      <ToggleItem name="Moodle" />
      <ToggleItem name="Schedule lookup" />
      <ToggleItem name="Banner web" />
    </Sheet>
  );
};

export default App;
