import { createMuiTheme, colors } from '@material-ui/core';
import { ptBR } from '@material-ui/core/locale';
import shadows from './shadows';
import typography from './typography';

const defaultTheme = createMuiTheme(
  {
    palette: {
      background: {
        default: colors.common.white,
        paper: colors.common.white,
        // dark: '#F4F6F8',
      },
      primary: {
        main: colors.indigo[500],
      },
      secondary: {
        main: colors.green[200],
        // main: colors.indigo[500],
      },
      text: {
        primary: colors.blueGrey[900],
        secondary: colors.blueGrey[600],
      },
      divider: colors.grey[200],
    },
    shadows,
    typography,
  },
  ptBR,
);

export default defaultTheme;

// export const defaultTheme = {
//   colors: {
//     greenLight: '#5DD594',
//     green: '#34cb79',
//     purple: '#7159c1',
//     // purple: '#7934CB',
//     purpleDark: '#322153',
//     red: '#c53030',
//     white: '#fff',
//     whiteLight: '#E1E1E6',
//     grey: '#a0a0b2',
//     greyShade: shade(0.3, '#a0a0b2'),
//     greyDark: '#6c6c80',
//     greyDarkest: '#3e3b47',
//     pink: '#CB3486',
//     orange: '#ff9000',
//     orangeDark: '#CB7934',
//     // opaque: '#41414D',
//     // cyan: '#78D1E1',
//     // yellow: '#e7de79',
//   },
//   backgrounds: {
//     default: '#f0f0f5',
//     white: '#fff',
//     lightest: '#E1E1E6',
//     lighter: '#eeefef',
//     dark: '#6c6c80',
//     darker: '#3e3b47',
//     darkest: '#13111B',
//   },
// };
