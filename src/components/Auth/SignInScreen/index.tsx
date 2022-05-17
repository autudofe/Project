import React from 'react';
import { CssBaseline } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LoginForm from './LoginForm';
import SideMiniature from '../SideMiniature';

const SignInScreen: React.FC = () => {
  return (
    <>
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container>
          <Grid item xs={12}>
            <Grid container component="main" sx={{ height: '100vh' }}>
              <CssBaseline />
              <SideMiniature />
              <LoginForm />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignInScreen;
