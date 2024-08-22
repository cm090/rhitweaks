import React, { ReactNode } from 'react';
import { scheduleDefaults } from '../../../defaults';
import { Page, ScheduleData } from '../../../types';
import ColorPicker from './ColorPicker';
import SettingsWrapper from './SettingsWrapper';

interface ScheduleSettingsPageProps {
  setPage: (page: Page) => void;
  data: ScheduleData;
  setData: React.Dispatch<React.SetStateAction<ScheduleData>>;
}

const ScheduleSettingsPage = (props: ScheduleSettingsPageProps): ReactNode => {
  const updateData = (key: string, value: string) =>
    props.setData((prevData) => ({ ...prevData, [key]: value }));

  return (
    <SettingsWrapper page="Schedule Lookup" back={() => props.setPage('home')}>
      <ColorPicker
        label="Background color"
        defaultValue={scheduleDefaults.bgColor}
        data={props.data.bgColor}
        dataKey="bgColor"
        setData={updateData}
      />
      <ColorPicker
        label="Accent color"
        defaultValue={scheduleDefaults.accentColor}
        data={props.data.accentColor}
        dataKey="accentColor"
        setData={updateData}
      />
      <ColorPicker
        label="Text color"
        defaultValue={scheduleDefaults.textColor}
        data={props.data.textColor}
        dataKey="textColor"
        setData={updateData}
      />
      <ColorPicker
        label="Border color"
        defaultValue={scheduleDefaults.borderColor}
        data={props.data.borderColor}
        dataKey="borderColor"
        setData={updateData}
      />
    </SettingsWrapper>
  );
};

export default ScheduleSettingsPage;
