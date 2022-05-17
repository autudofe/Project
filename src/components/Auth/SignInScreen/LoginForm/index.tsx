import React, { useContext } from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import firebase from 'firebase/app';
import { Link } from 'react-router-dom';
import logo from '../../../../images/logo.png';
import { UIContext } from '../../../Unknown/UIContext';

interface ValuesState {
  password: string;
  showPassword: boolean;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(12, 'Password should be of minimum 12 characters length')
    .required('Password is required'),
});

const LoginForm: React.FC = () => {
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

  const [values, setValues] = React.useState<ValuesState>({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (formValues) => {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(formValues.email, formValues.password);
        await handleAlert('success login', true);
      } catch (error: any) {
        await handleAlert(error.message, false);
      }
    },
  });

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Box
        sx={{
          my: 8,
          mx: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img src={logo} alt="logo" loading="lazy" />

        <Typography
          sx={{ mt: 10 }}
          component="h1"
          variant="h4"
          fontWeight="500"
        >
          Login
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <FormControl margin="normal" required fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              fullWidth
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              type={values.showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <FormHelperText error>
              {formik.touched.password && formik.errors.password}
            </FormHelperText>
          </FormControl>
          <Button
            disabled={formik.isSubmitting}
            color="primary"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            variant="contained"
            type="submit"
          >
            Login
          </Button>
        </Box>
        <Typography
          sx={{ mt: 10 }}
          component="h6"
          variant="h6"
          fontWeight="500"
        >
          Don’t have an account?
        </Typography>

        <Link to="/register" style={{ textDecoration: 'none' }}>
          <Typography color="primary" variant="h6" fontWeight="500">
            REGISTER
          </Typography>
        </Link>
      </Box>
    </Grid>
  );
};

export default LoginForm;
