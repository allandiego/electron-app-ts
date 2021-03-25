import React from 'react';

import logo from '../../../assets/logo-app.svg';

const Logo: React.FC = ({ ...rest }) => {
  return <img alt="Logo" height={42} src={logo} {...rest} />;
};

export default Logo;
