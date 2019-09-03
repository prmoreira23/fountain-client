import React from 'react';
import { withRouter } from 'react-router';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import { logout } from '../../../actions/authActions';
import { deleteToken } from '../../../utils/auth';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  buttonLink: {
    margin: theme.spacing(1, 1.5),
    textDecoration: 'none !important',
  },
  welcome: {
    marginLeft: 50,
  },
}));

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => ({
 logoutAction: (auth) => dispatch(logout())
})

function AppBarComponent(props){
  const classes = useStyles();
  const { auth: { user } } = props;
  const { name, role } = user ? user.data.attributes : {};

  const logout = (e) => {
    const { history } = props;
    e.preventDefault();
    deleteToken();
    props.logoutAction();
    history.push('/');
  }

  const getMenuLinks = (role) => {
    const defaultLinks = [
      { title: "Home", link: "/" },
    ];
    switch(role) {
      case "applicant":
        defaultLinks.push({ title: "Jobs", link: "/jobs" });
        defaultLinks.push({ title: "My Applications", link: "/applications" });
        break;
      case "employer":
        defaultLinks.push({ title: "Job Openings", link: "/jobs" });
        defaultLinks.push({ title: "Applicants", link: "/applications" });
        break;
      default:
        defaultLinks.push({ title: "Jobs", link: "/jobs" });
    }
    return defaultLinks;
  }

  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          Jooby.com
        </Typography>
        <nav>
          {
            getMenuLinks(role).map(item => (
              <Link variant="button" component={RouterLink} color="textPrimary" to={item.link} key={uuid()} className={classes.link}>
                {item.title}
              </Link>
            ))
          }
          {!user && (
            <Link variant="button" component={RouterLink} color="textPrimary" to="/sign-up" className={classes.link}>
              Sign up
            </Link>
          )}
        </nav>
        { user && (
          <div className={classes.welcome}>Welcome, { name }!</div>
        )}
        <Link variant="button" component={RouterLink} color="textPrimary" to="/sign-in" className={classes.buttonLink}>
          <Button
            color="primary"
            variant="outlined"
            className={classes.link}
            onClick={user ? logout : null}
          >
            { user ? 'Logout' : 'Login' }
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

AppBarComponent.defaultProps = {
  auth: {
    user: {
      data: {
        attributes: {},
      },
    },
  }
}

AppBarComponent.propTypes = {
  logoutAction: PropTypes.func.isRequired,
  auth: PropTypes.shape(),
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppBarComponent));
