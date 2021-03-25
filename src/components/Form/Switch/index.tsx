import React, { useRef, useEffect } from 'react';
import {
  Switch as BaseSwitch,
  // FormControl,
  FormLabel,
  // FormGroup,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';
import { useField } from '@unform/core';

import { SwitchProps } from './types';

import { Container } from './styles';

const Switch: React.FC<SwitchProps> = ({
  name,
  legend,
  label,
  helpText,
  defaultChecked,
  ...restProps
}) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue = false, registerField } = useField(name);

  useEffect(() => {
    if (fieldName) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'checked',
      });
    }
  }, [fieldName, registerField]);

  return (
    <Container>
      {/* <FormControl component="fieldset"> */}
      {legend && <FormLabel component="legend">{legend}</FormLabel>}
      {/* <FormGroup> */}
      <FormControlLabel
        control={
          <BaseSwitch
            {...restProps}
            name={name}
            defaultChecked={Boolean(defaultValue) || Boolean(defaultChecked)}
            inputRef={inputRef}
          />
        }
        labelPlacement="start"
        label={label}
      />
      {/* </FormGroup> */}
      {helpText && <FormHelperText>{helpText}</FormHelperText>}

      {/* </FormControl> */}
    </Container>
  );
};

export default Switch;
