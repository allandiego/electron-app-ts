import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { styledTheme } from './styles/StyledTheme';

import GlobalStyles from './styles/GlobalStyles';
import materialDefaultTheme from './styles/theme';
import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <StyledThemeProvider theme={styledTheme}>
        <MaterialThemeProvider theme={materialDefaultTheme}>
          <AppProvider>
            <Routes />
          </AppProvider>

          <GlobalStyles />
        </MaterialThemeProvider>
      </StyledThemeProvider>
    </BrowserRouter>
  );
};

export default App;
