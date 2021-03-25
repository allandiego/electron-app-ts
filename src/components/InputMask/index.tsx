import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactInputMask, { Props as InputMaskProps } from 'react-input-mask';
import { useField } from '@unform/core';
import { IconBaseProps } from 'react-icons';
import { MdErrorOutline } from 'react-icons/md';

import { Container, Error } from './styles';

interface InputProps extends InputMaskProps {
  name: string;
  containerStyle?: React.CSSProperties;
  icon?: React.ComponentType<IconBaseProps>;
}

const InputMask: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isField, setIsField] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsField(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },

      clearValue(ref: any) {
        ref.setInputValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isField={isField}
      isFocused={isFocused}
      data-testid="input-container"
    >
      {Icon && <Icon size={20} />}
      <ReactInputMask
        ref={inputRef}
        // inputRef={inputRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        {...rest}
      />

      {error && (
        <Error title={error}>
          <MdErrorOutline color="c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};
export default InputMask;
