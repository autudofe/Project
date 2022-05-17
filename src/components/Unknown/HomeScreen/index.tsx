import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { useUser } from 'reactfire';
import firebase from 'firebase/app';
import clearFirestoreCache from '../../../common/clearFirestoreCache';
import { UIContext } from '../UIContext';
import stringAvatar from '../../../common/HomeScreenHelpers';

const settings = ['Logout'];

const HomeScreen: React.FC = () => {
  const { setAlert } = useContext(UIContext);
  const handleAlert = React.useCallback(
    async (message: string, status: boolean) => {
      setAlert({
        show: true,
        severity: status ? 'info' : 'error',
        message,
      });
    },
    [setAlert],
  );
  const { data: user, status } = useUser();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      await clearFirestoreCache();
      await handleAlert('success logout', true);
    } catch (error: any) {
      await handleAlert(error.message, false);
    }
  };

  return (
    <Box height="100vh" display="flex" justifyContent="center">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Voypost
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{stringAvatar(user.displayName)}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: 5 }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography onClick={handleLogout} textAlign="center">
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};

export default HomeScreen;
