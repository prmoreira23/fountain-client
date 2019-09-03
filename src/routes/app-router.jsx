import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';

import Home from '../components/home-page';
import Signup from '../components/signup';
import SignIn from '../components/signin';
import JobBoard from '../components/job-board';
import ApplicationsTable from '../components/applications';
import NewForm from '../components/job-openings/new';
import UpdateForm from '../components/job-openings/update';
import RouteRedirect from '../components/shared/route-redirect';
import { isUserLoggedIn, isUser } from '../utils/auth';

const mapStateToProps = state => {
  return { ...state };
};

function AppRouter(props) {
  const [loggedIn, setLoggedIn] = useState(isUserLoggedIn)
  const { auth: { user } } = props;

  useEffect(() => {
    const userLoggerIn = isUserLoggedIn();
    if(loggedIn !== userLoggerIn) {
      setLoggedIn(userLoggerIn);
    }
  }, [loggedIn, user]);

  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/jobs" component={JobBoard} />
      <RouteRedirect path="/jobs/new" redirectTo="/" condition={isUser('employer', user)} component={NewForm} />
      <RouteRedirect path="/jobs/:id/edit" redirectTo="/" condition={isUser('employer', user)} component={UpdateForm} />
      <RouteRedirect path="/applications" redirectTo="/sign-in" condition={loggedIn} component={ApplicationsTable} />
      <RouteRedirect path="/sign-up" redirectTo="/" condition={!loggedIn} component={Signup} />
      <RouteRedirect path="/sign-in" redirectTo="/" condition={!loggedIn} component={SignIn} />
    </Router>
  );
}

export default connect(mapStateToProps, null)(AppRouter);
