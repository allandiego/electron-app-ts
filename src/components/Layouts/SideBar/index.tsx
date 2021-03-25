import React, { useEffect, memo } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  // Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from '@material-ui/core';

import {
  FiFile as DashboardIcon,
  FiLogOut as LogoutIcon,
} from 'react-icons/fi';

import { useAuth } from '../../../hooks/auth';
import NavItem from './NavItem';
import NavButton from './NavButton';
import avatarPlaceholderImg from '../../../assets/avatar-placeholder.png';

const items = [
  {
    href: '/',
    icon: DashboardIcon,
    title: 'Arquivos',
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  userName: {},
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
}));

interface SideBarProps {
  onMobileClose(): void;
  openMobile: boolean;
}
const SideBar: React.FC<SideBarProps> = ({
  onMobileClose,
  openMobile = false,
  ...rest
}) => {
  const { user, signOut } = useAuth();

  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      {/* <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={avatarPlaceholderImg}
          to="/profile"
        />
        <Typography
          className={classes.userName}
          color="textPrimary"
          variant="h5"
        >
          {user?.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user?.job_title}
        </Typography>
      </Box> */}

      <Divider />

      <Box p={2}>
        <List>
          {items.map(item => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}

          <Divider />

          {/* <NavButton onClick={signOut} title="Sair" icon={LogoutIcon} /> */}
        </List>
      </Box>
      {/* <Box flexGrow={1} />
      <Box p={2} m={2} bgcolor="background.dark">
        <Typography align="center" gutterBottom variant="h4">
          Need more?
        </Typography>
        <Typography align="center" variant="body2">
          Upgrade to PRO version and access 20 more screens
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            color="primary"
            component="a"
            href="https://react-material-kit.devias.io"
            variant="contained"
          >
            See PRO version
          </Button>
        </Box>
      </Box> */}
    </Box>
  );

  return (
    <PerfectScrollbar>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>

      {/* <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden> */}

      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </PerfectScrollbar>
  );
};

export default memo(SideBar);
