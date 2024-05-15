import React from 'react';
import { MoodleData, Page } from '../../../types';
import ColorPicker from './ColorPicker';
import SettingsWrapper from './SettingsWrapper';

interface MoodleSettingsPageProps {
  data: MoodleData;
  setData: React.Dispatch<React.SetStateAction<MoodleData>>;
  setPage: (page: Page) => void;
}

const MoodleSettingsPage = (props: MoodleSettingsPageProps): JSX.Element => {
  return (
    <SettingsWrapper page="Moodle" back={() => props.setPage('home')}>
      <ColorPicker
        label="Background color"
        data={props.data.bgColor}
        setData={(bgColor) => props.setData((data) => ({ ...data, bgColor }))}
      />
      <ColorPicker
        label="Text color"
        data={props.data.textColor}
        setData={(textColor) =>
          props.setData((data) => ({ ...data, textColor }))
        }
      />
      <ColorPicker
        label="Card color"
        data={props.data.cardColor}
        setData={(cardColor) =>
          props.setData((data) => ({ ...data, cardColor }))
        }
      />
      <ColorPicker
        label="Accent color"
        data={props.data.accentColor}
        setData={(accentColor) =>
          props.setData((data) => ({ ...data, accentColor }))
        }
      />
      <ColorPicker
        label="Sidebar color"
        data={props.data.sbColor}
        setData={(sbColor) => props.setData((data) => ({ ...data, sbColor }))}
      />
    </SettingsWrapper>
  );
};

export default MoodleSettingsPage;
