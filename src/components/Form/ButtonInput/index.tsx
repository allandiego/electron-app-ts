import React, { useRef, useEffect, useState } from 'react';

import { TextField as BaseTextInput } from '@material-ui/core';
import { useField } from '@unform/core';

import { TextFieldProps } from './types';

import { Container } from './styles';

const ButtonInput: React.FC<TextFieldProps> = ({
  name,
  adornment,
  helperText,
  defaultValue,
  InputLabelProps,
  ...restProps
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    fieldName,
    defaultValue: defaultFieldValue,
    registerField,
    error,
  } = useField(name);
  const defaultInputValue = defaultValue ?? defaultFieldValue;
  const [shrink, setShrink] = useState<boolean>(!!defaultInputValue);

  useEffect(() => {
    if (fieldName) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
        clearValue(elementRref, resetValue: string) {
          const newValue = resetValue ?? defaultInputValue ?? '';
          elementRref.value = newValue;
          setShrink(!!newValue);
        },
        setValue(elementRref: HTMLInputElement, value: string) {
          if (elementRref) {
            const newValue = String(value) ?? '';
            elementRref.value = newValue;
            setShrink(!!newValue);
          }
        },
      });
    }
  }, [fieldName, registerField, defaultInputValue, setShrink]);

  useEffect(() => {
    const input = inputRef.current;

    function handlerFocusEvent(evt: FocusEvent) {
      const inputValue = (evt.currentTarget as HTMLInputElement).value;
      if (!inputValue) setShrink(true);
    }

    function handlerBlurEvent(evt: FocusEvent) {
      const inputValue = (evt.target as HTMLInputElement).value;
      if (!inputValue) setShrink(false);
    }

    if (input) {
      input.addEventListener('focus', handlerFocusEvent);
      input.addEventListener('blur', handlerBlurEvent);
    }

    return () => {
      if (input) {
        input.removeEventListener('focus', handlerFocusEvent);
        input.removeEventListener('blur', handlerBlurEvent);
      }
    };
  }, [inputRef]);

  return (
    <Container>
      <BaseTextInput
        {...restProps}
        name={fieldName}
        error={!!error}
        helperText={error || helperText}
        inputRef={inputRef}
        defaultValue={defaultInputValue}
        InputLabelProps={{
          ...InputLabelProps,
          shrink: InputLabelProps?.shrink ?? shrink,
        }}
        InputProps={{
          readOnly: true,
          endAdornment: adornment,
        }}
      />
    </Container>
  );
};

export default React.memo(ButtonInput);
