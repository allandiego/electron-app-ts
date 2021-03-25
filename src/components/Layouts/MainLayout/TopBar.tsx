import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';

import { AppLogo } from '../../Svg';

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 64,
  },
});

interface TopBarProps {
  className?: string;
}

const TopBar: React.FC<TopBarProps> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <AppLogo />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
