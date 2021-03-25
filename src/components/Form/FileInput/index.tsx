import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { FormHelperText, InputLabel } from '@material-ui/core';

// import { FiUploadCloud as FileIcon } from 'react-icons/fi';

import { Container } from './styles';

interface Props {
  name: string;
  label: string;
}
type InputProps = JSX.IntrinsicElements['input'] & Props;

const FileInput: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        ref.value = '';
      },
      // setValue(_: HTMLInputElement, value: string) {},
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <InputLabel error={!!error} htmlFor={name}>
        {label}
      </InputLabel>
      <label htmlFor={name}>
        {/* <FileIcon color="#7159c1" size={50} /> Selecionar Arquivo */}
        <input type="file" ref={inputRef} {...rest} />
      </label>
      {!!error && <FormHelperText error={!!error}>{error}</FormHelperText>}
    </Container>
  );
};

export default FileInput;
