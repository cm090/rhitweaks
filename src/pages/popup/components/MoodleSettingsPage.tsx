import React from 'react';
import { Page } from '../../../types';
import ColorPicker from './ColorPicker';
import SettingsWrapper from './SettingsWrapper';

interface MoodleSettingsPageProps {
  setPage: (page: Page) => void;
}

const MoodleSettingsPage = (props: MoodleSettingsPageProps): JSX.Element => {
  return (
    <SettingsWrapper page="Moodle" back={() => props.setPage('home')}>
      <ColorPicker label="Background color" />
      <ColorPicker label="Text color" />
      <ColorPicker label="Card color" />
      <ColorPicker label="Accent color" />
      <ColorPicker label="Sidebar color" />
    </SettingsWrapper>
  );
};

export default MoodleSettingsPage;
