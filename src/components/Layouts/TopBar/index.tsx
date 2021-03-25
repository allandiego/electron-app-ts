import React, { useState, memo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  Input as InputIcon,
  NotificationsOutlined as NotificationsIcon,
} from '@material-ui/icons';

import { useAuth } from '../../../hooks/auth';
import { AppLogo } from '../../Svg';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60,
  },
}));

interface TopBarProps {
  className?: string;
  onMobileNavOpen(): void;
}

const TopBar: React.FC<TopBarProps> = ({
  className,
  onMobileNavOpen,
  ...rest
}) => {
  const { signOut } = useAuth();

  const classes = useStyles();
  const [notifications] = useState([]);

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <AppLogo />
        </RouterLink>

        <Box flexGrow={1} />
        {/* <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={signOut} color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden> */}

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default memo(TopBar);
