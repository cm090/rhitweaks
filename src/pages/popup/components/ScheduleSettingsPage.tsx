import React from 'react';
import { Page, ScheduleData } from '../../../types';
import SettingsWrapper from './SettingsWrapper';

interface ScheduleSettingsPageProps {
  setPage: (page: Page) => void;
  data: ScheduleData;
  setData: React.Dispatch<React.SetStateAction<ScheduleData>>;
}

const ScheduleSettingsPage = (
  props: ScheduleSettingsPageProps,
): JSX.Element => {
  return (
    <SettingsWrapper page="Schedule Lookup" back={() => props.setPage('home')}>
      <div>Coming soon</div>
    </SettingsWrapper>
  );
};

export default ScheduleSettingsPage;
