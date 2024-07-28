import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from '@mui/joy';
import React, { ReactNode, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { HexValue } from '../../../types';
import { Refresh } from '@mui/icons-material';

interface ColorPickerProps {
  label: string;
  defaultValue: HexValue;
  data: HexValue;
  setData: (data: HexValue) => void;
}

const ColorPicker = (props: ColorPickerProps): ReactNode => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [color, setColor] = useState<HexValue>(props.data);
  const [valid, setValid] = useState<boolean>(true);
  const setData = props.setData;

  useEffect(() => {
    if (valid) {
      setData(color);
    }
  }, [color, valid]);

  return (
    <FormControl sx={{ width: '100%', marginBottom: '10px' }}>
      <FormLabel>{props.label}</FormLabel>
      <Input
        variant="outlined"
        color={color.match(/^#([A-Fa-f0-9]{3}){1,2}$/) ? 'neutral' : 'danger'}
        value={color}
        onChange={(e) => {
          setValid(e.target.validity.valid);
          setColor(e.target.value as HexValue);
        }}
        slotProps={{
          input: { pattern: '^#([A-Fa-f0-9]{3}){1,2}$', maxLength: 7 },
        }}
        sx={{ '--Input-focusedThickness': '0px' }}
        endDecorator={
          <>
            <IconButton
              onClick={() => setColor(props.defaultValue)}
              sx={{ marginRight: '2px' }}
            >
              <Refresh />
            </IconButton>
            <Button
              variant="outlined"
              color="neutral"
              onClick={() => setDisplayColorPicker(true)}
              sx={{
                backgroundColor: color,
                '&:hover': {
                  backgroundColor: color,
                },
                borderWidth: '2px',
              }}
            />
          </>
        }
      />
      <Modal
        open={displayColorPicker}
        onClose={() => setDisplayColorPicker(false)}
      >
        <ModalDialog>
          <ModalClose />
          <Typography level="h4">{props.label}</Typography>
          <HexColorPicker
            color={color}
            onChange={(e) => {
              setValid(true);
              setColor(e as HexValue);
            }}
            style={{ width: '100%' }}
          />
        </ModalDialog>
      </Modal>
    </FormControl>
  );
};

export default ColorPicker;
