import React, { useState } from "react";
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
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import BusinessIcon from "@material-ui/icons/Business";
import PersonIcon from "@material-ui/icons/Person";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import Copyright from '../shared/copyright';
import { createUser } from '../../services/user-services';

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

function SignUp(props) {
  const { history } = props;
  const classes = useStyles();
  const [values, setValues] = useState({ name: '', email: '', password: '', password_confirmation: '', role: 'applicant', errors: {} })

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  }

  const handleSelect = (name) => (e, value) => {
    setValues({...values, [name]: value});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, errors: {} });
    createUser(values).then((user) => {
      history.push("/");
    }).catch(error => {
      const { errors } = error.response.data.data.attributes;
      setValues({ ...values, errors });
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
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper square className={classes.tabs}>
                  <Tabs
                    value={values.role}
                    name="role"
                    onChange={handleSelect("role")}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="icon label tabs example"
                  >
                    <Tab
                      icon={<PersonIcon />}
                      label="Applicant"
                      value="applicant"
                    />
                    <Tab
                      icon={<BusinessIcon />}
                      label="Employeer"
                      value="employer"
                    />
                  </Tabs>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  value={values.name}
                  onChange={handleInputChange}
                  error={!!values.errors['name']}
                  helperText={values.errors['name']}
                  autoComplete="name"
                />
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Password Confirmation"
                  type="password"
                  id="password_confirmation"
                  value={values.password_confirmation}
                  onChange={handleInputChange}
                  error={!!values.errors['password_confirmation']}
                  helperText={values.errors['password_confirmation']}
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/sign-in" component={RouterLink} variant="body2">
                  Already have an account? Sign in
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
}

export default SignUp;
