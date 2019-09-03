import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const RouteRedirect = ({ component: Component, ...rest }) => {

  const { condition, redirectTo } = rest;

  return (
    <Route
      {...rest}
      render={props =>
        condition ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />
        )
      }
    />
  );
}

export default RouteRedirect;
