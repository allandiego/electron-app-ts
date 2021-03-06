import React, { useRef, useEffect } from 'react';

import { Checkbox as BaseCheckbox } from '@material-ui/core';
import { useField } from '@unform/core';

import { CheckboxProps } from './types';

const Checkbox: React.FC<CheckboxProps> = ({
  name,
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
    <BaseCheckbox
      {...restProps}
      name={name}
      defaultChecked={Boolean(defaultValue) || Boolean(defaultChecked)}
      inputRef={inputRef}
    />
  );
};

export default Checkbox;
