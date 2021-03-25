import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root'),
  );
}

render();
