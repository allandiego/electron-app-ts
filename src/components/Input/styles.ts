import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isField: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: ${props => props.theme.colors.whiteLight};
  border-radius: 10px;
  /* padding: 16px; */
  padding: 0px 16px 0px 16px;
  width: 100%;

  border: 2px solid ${props => props.theme.colors.green};
  color: ${props => props.theme.colors.greyDark};

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: ${props.theme.colors.red};
    `}

  ${props =>
    props.isFocused &&
    css`
      color: ${props.theme.colors.purpleDark};
      border-color: ${props.theme.colors.purple};
    `}

  ${props =>
    props.isField &&
    css`
      color: ${props.theme.colors.purpleDark};
    `}

  input {
    flex: 1;
    padding: 16px 0px 16px 0px;
    background: transparent;
    border: 0;
    color: ${props => props.theme.colors.greyDarkest};

    &::placeholder {
      color: ${props => props.theme.colors.greyDark};
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: ${props => props.theme.colors.red};
    color: ${props => props.theme.colors.whiteLight};

    &::before {
      border-color: ${props => props.theme.colors.red} transparent;
    }
  }
`;

export const ErrorBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.red};

  svg {
    margin-right: 5px;
  }

  span {
    background: ${props => props.theme.colors.red};
    color: ${props => props.theme.colors.red};

    &::before {
      border-color: ${props => props.theme.colors.red} transparent;
    }
  }
`;
