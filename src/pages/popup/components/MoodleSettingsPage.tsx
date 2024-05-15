import React from 'react';
import { Page } from '../../../types';
import SettingsWrapper from './SettingsWrapper';

interface MoodleSettingsPageProps {
  setPage: (page: Page) => void;
}

const MoodleSettingsPage = (props: MoodleSettingsPageProps): JSX.Element => {
  return (
    <SettingsWrapper page="Moodle" back={() => props.setPage('home')}>
      <div>Coming soon</div>
    </SettingsWrapper>
  );
};

export default MoodleSettingsPage;
