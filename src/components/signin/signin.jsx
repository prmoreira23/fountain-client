import React, { useState } from "react";
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { login } from '../../actions/authActions';
import { storeToken } from '../../utils/auth';
import Copyright from '../shared/copyright';
import AuthAdapter from '../../services/auth-services';

const mapDispatchToProps = dispatch => ({
 loginAction: (auth) => dispatch(login(auth))
});

const mapStateToProps = state => {
  return { ...state };
};

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  tabs: {
    flexGrow: 1,
    maxWidth: "inherent"
  },
  image: {
    backgroundImage: "url(https://images.unsplash.com/photo-1461632830798-3adb3034e4c8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function SignInSide(props) {
  const classes = useStyles();
  const [values, setValues] = useState({ email: '', password: '', errors: {} })

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  }

  const handleLogin = e => {
    e.preventDefault();
    const loginParams = {...values};
    delete loginParams.errors;

    AuthAdapter.login(loginParams)
      .then(auth => {
        if (!auth.error) {
          props.loginAction({ user: auth.user });
          storeToken(auth.token);
          props.history.push('/');
        }
      });
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={values.email}
                  onChange={handleInputChange}
                  error={!!values.errors['email']}
                  helperText={values.errors['email']}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={values.password}
                  onChange={handleInputChange}
                  error={!!values.errors['password']}
                  helperText={values.errors['password']}
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/sign-up" component={RouterLink} variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInSide);
