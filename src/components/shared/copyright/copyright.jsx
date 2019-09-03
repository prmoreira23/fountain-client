import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/" component={RouterLink}>
        Jooby.com
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default Copyright;
