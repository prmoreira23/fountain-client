import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';

import Copyright from '../shared/copyright';
import { getLastestJobOpenings } from '../../services/job-opening-services';
import AppBar from '../shared/app-bar';
import { isUserLoggedIn } from '../../utils/auth';
import JobCard from './job-card';

const useStyles = makeStyles(theme => ({
  buttonLink: {
    margin: theme.spacing(1, 1.5),
    textDecoration: 'none !important',
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
    marginTop: 'auto',
  },
}));

const mapStateToProps = state => {
  return { ...state };
};

function Home(props) {
  const classes = useStyles();
  const [jobOpenings, setJobOpenings] = useState([]);
  const userLoggedIn = isUserLoggedIn();
  const { auth: { user } } = props;
  const { role } = user ? user.data.attributes : {};

  const formatJobOpening = (jobOpening) => {
    const { id, attributes } = jobOpening;
    const { title, description, employer, applied } = attributes;
    return { id, title, description, employer, applied };
  }

  const onSuccess = (id) => {
    const i = jobOpenings.findIndex(job => job.id === id);
    const newJobOpenings = [...jobOpenings];
    newJobOpenings[i].applied = true;
    setJobOpenings(newJobOpenings);
  }

  useEffect(() => {
    getLastestJobOpenings().then(jobOpenings => {
      const { data } = jobOpenings;
      const jobs = data.map(job => formatJobOpening(job));
      setJobOpenings(jobs);
    });
  }, [userLoggedIn]);

  let heroText = "We're the only job board you'll ever need. Sign in or sign up and start enjoying curated jobs in the best companies in the U.S. and Canada.";

  if(userLoggedIn) {
    heroText = role === "applicant" ?
    "We're the only job board you'll ever need. You're ready to start enjoying curated jobs in the best companies in the U.S. and Canada." :
    "We're the only job board you'll ever need. You're ready to find the best candidates to fill in your open positions.";
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {userLoggedIn ? "Welcome Back!" : "Job Board"}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              { heroText }
            </Typography>
            {!userLoggedIn && (
              <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link variant="button" component={RouterLink} color="textPrimary" to="/sign-up" className={classes.buttonLink}>
                    <Button variant="contained" color="primary">
                      Create a new account
                    </Button>
                  </Link>
                </Grid>
                <Grid item>
                  <Link variant="button" component={RouterLink} color="textPrimary" to="/sign-in" className={classes.buttonLink}>
                    <Button variant="outlined" color="primary">
                      Sign in
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>)
          }
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" color="textSecondary" gutterBottom>
                { role === "employer" ? "Your Latest Added Jobs" : "Latest Added Jobs" }
              </Typography>
            </Grid>
            {jobOpenings.map(job => (
              <JobCard key={job.id} job={job} onSuccess={onSuccess} />
            ))}
          </Grid>

        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Made with love by Pablo Rocha Moreira.
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          We help you find a new job in no time!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default connect(mapStateToProps, null)(Home);
