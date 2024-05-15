import React from 'react';
import { Page } from '../../../types';
import SettingsWrapper from './SettingsWrapper';

interface ScheduleSettingsPageProps {
  setPage: (page: Page) => void;
}

const ScheduleSettingsPage = (props: ScheduleSettingsPageProps): JSX.Element => {
  return (
    <SettingsWrapper page="Schedule Lookup" back={() => props.setPage('home')}>
      <div>Coming soon</div>
    </SettingsWrapper>
  );
};

export default ScheduleSettingsPage;
