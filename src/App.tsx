import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import { MemoryRouter as Router } from 'react-router-dom';
import { ThemeProvider as MaterialThemeProvider } from '@material-ui/core';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { styledTheme } from './styles/StyledTheme';

import GlobalStyles from './styles/GlobalStyles';
import materialDefaultTheme from './styles/theme';
import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <Router>
      <StyledThemeProvider theme={styledTheme}>
        <MaterialThemeProvider theme={materialDefaultTheme}>
          <AppProvider>
            <Routes />
          </AppProvider>

          <GlobalStyles />
        </MaterialThemeProvider>
      </StyledThemeProvider>
    </Router>
  );
};

export default App;
