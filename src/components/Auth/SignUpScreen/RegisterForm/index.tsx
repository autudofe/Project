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
import { UIContext } from '../../../Unknown/UIContext';
import logo from '../../../../images/logo.png';

interface ValuesState {
  password: string;
  showPassword: boolean;
  repeatPassword: boolean;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(12, 'Password should be of minimum 12 characters length')
    .required('Password is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password must match')
    .required('Confirm password is required'),
  fullName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required')
    .matches(
      /^[A-Z][a-z]{1,10}\s[A-Z][a-z]{1,10}$/,
      'Full Name must contain with two capitalized words. Example: John Smith',
    ),
});

const RegisterForm: React.FC = () => {
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
    repeatPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleClickRepeatPassword = () => {
    setValues({
      ...values,
      repeatPassword: !values.repeatPassword,
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
      fullName: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema,
    onSubmit: async (formValues) => {
      try {
        const registeredUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            formValues.email,
            formValues.password,
          );
        await registeredUser?.user?.updateProfile({
          displayName: formValues.fullName,
        });
        await handleAlert('Welcome on board 🚀', true);
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
          Register
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
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="fullName"
            autoFocus
            type="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
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
              /* helperText={formik.touched.password && formik.errors.password} */
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
          <FormControl margin="normal" required fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Repeat password
            </InputLabel>
            <OutlinedInput
              fullWidth
              id="repeatPassword"
              name="repeatPassword"
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.repeatPassword &&
                Boolean(formik.errors.repeatPassword)
              }
              type={values.repeatPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickRepeatPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.repeatPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Repeat password"
            />
            <FormHelperText error>
              {formik.touched.repeatPassword && formik.errors.repeatPassword}
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
            REGISTER
          </Button>
        </Box>
        <Typography
          sx={{ mt: 10 }}
          component="h6"
          variant="h6"
          fontWeight="500"
        >
          Already have account?
        </Typography>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Typography color="primary" variant="h6" fontWeight="500">
            LOGIN
          </Typography>
        </Link>
      </Box>
    </Grid>
  );
};

export default RegisterForm;
