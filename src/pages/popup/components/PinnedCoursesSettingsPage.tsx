import React from 'react';
import { BannerData, Page } from '../../../types';
import SettingsWrapper from './SettingsWrapper';

interface ScheduleSettingsPageProps {
  setPage: (page: Page) => void;
  data: BannerData;
  setData: React.Dispatch<React.SetStateAction<BannerData>>;
}

const PinnedCoursesSettingsPage = (
  props: ScheduleSettingsPageProps,
): JSX.Element => {
  return (
    <SettingsWrapper
      page="Pinned Courses"
      back={() => props.setPage('moodleSettings')}
    >
      <div>Coming soon</div>
    </SettingsWrapper>
  );
};

export default PinnedCoursesSettingsPage;
