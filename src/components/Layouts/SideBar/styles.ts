import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.nav`
  width: 300px;
  flex-shrink: 0;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  padding-top: 100px;
  align-items: center;
  height: 100%;
  width: 300px;

  background-color: ${props => props.theme.backgrounds.default};
  border-right: 1px solid rgba(0, 0, 0, 0.12);

  top: 0;
  left: 0;
  right: auto;
  outline: 0;
  z-index: 9;
  position: fixed;
  overflow-y: auto;
`;

export const MenuContainer = styled.div`
  ul {
    display: flex;
    flex-direction: column;

    li {
      display: flex;
      flex: 1;
      border-radius: 6px;
      padding: 10px;
      color: ${props => props.theme.colors.purple};
      /* border: 1px solid #000; */
      &:hover {
        /* color: ${props => props.theme.colors.white}; */
        background: ${props => shade(0.1, props.theme.backgrounds.default)};
      }

      div {
        display: flex;
        flex: 1;
        /* border: 1px solid #00ff00; */
        a {
          display: flex;
          flex: 1;
          flex-direction: row;
          align-items: center;
          font-weight: bold;
          /* text-transform: uppercase; */
          color: ${props => props.theme.colors.purple};
          /* &:hover {
            color: ${props => props.theme.colors.white};
          } */

          svg {
            margin-right: 5px;
          }
        }
      }
    }
  }
`;
