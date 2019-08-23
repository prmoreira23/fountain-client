import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from '../components/home-page';
import Signup from '../components/signup';
import SignIn from '../components/signin';

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/sign-up/" component={Signup} />
      <Route path="/sign-in/" component={SignIn} />
    </Router>
  );
}

export default AppRouter;
