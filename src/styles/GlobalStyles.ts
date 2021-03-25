import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html {
    -webkit-font-smoothing: antialiased;
    height: '100%';
    width: '100%';
  }

  body: {
    background: '#f4f6f8';
    height: '100%';
    width: '100%';
  }

  a {
    text-decoration: none;
  }

  #root {
    height: '100%';
    width: '100%';
  }


  /* *, button, input {
    border: 0;
    background: none;
    font-family: Roboto, Arial, Helvetica, sans-serif;
    font-size: 16px;
  } */

  /* Selects the document's root element */
  /* :root {
    --primary-color: #34cb79;
    --secondary-color: #322153;
    --error-color: #c53030;
    --title-color: #322153;
    --text-color: #6c6c80;
    --placeholder-color: #a0a0b2;
    --background-color: #f0f0f5;
    --accent-color: #7934CB;
    --complementary-color: #CB3486;
    --button-text-color: #ffff;
    --white-color: #ffff;
    --link-color: #ff9000;
    --shadow-color: #3e3b47;
  } */
`;
