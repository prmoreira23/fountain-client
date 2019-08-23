import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from 'react-router-dom';

import Copyright from '../shared/copyright';

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
  icon: {
    marginRight: theme.spacing(2),
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
  },
}));

const jobs = [
  { id: "1", title: "Java Developer", description: "Best Java Developer in the U.S. Best Java Developer in the U.S.", employer: "Amazon.com" },
  { id: "2", title: "Java Developer", description: "Best Java Developer in the U.S.", employer: "Amazon.com" },
  { id: "3", title: "Java Developer", description: "Best Java Developer in the U.S.", employer: "Amazon.com" },
  { id: "4", title: "Java Developer", description: "Best Java Developer in the U.S.", employer: "Amazon.com" },
  { id: "5", title: "Java Developer", description: "Best Java Developer in the U.S.", employer: "Amazon.com" },
  { id: "6", title: "Java Developer", description: "Best Java Developer in the U.S.", employer: "Amazon.com" },
  { id: "7", title: "Java Developer", description: "Best Java Developer in the U.S.", employer: "Amazon.com" },
  { id: "8", title: "Java Developer", description: "Best Java Developer in the U.S.", employer: "Amazon.com" },
  { id: "9", title: "Java Developer", description: "Best Java Developer in the U.S.", employer: "Amazon.com" },
];

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Jooby.com
          </Typography>
          <nav>
            <Link variant="button" component={RouterLink} color="textPrimary" to="/jobs" className={classes.link}>
              Job Openings
            </Link>
            <Link variant="button" component={RouterLink} color="textPrimary" to="/sign-up" className={classes.link}>
              Sign up
            </Link>
          </nav>
          <Button href="/sign-in" color="primary" variant="outlined" className={classes.link}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Job Board
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              We're the only job board you'll ever need. Sign in or sign up and start enjoying curated jobs in the best companies in the U.S. and Canada.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button href="/sign-up" variant="contained" color="primary">
                    Create a new account
                  </Button>
                </Grid>
                <Grid item>
                  <Button href="/sign-in" variant="outlined" color="primary">
                    Sign in
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" color="textSecondary" gutterBottom>
                Latest Jobs
              </Typography>
            </Grid>
            {jobs.map(job => (
              <Grid item key={job.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {job.title}
                    </Typography>
                    <Typography>
                    {job.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Apply
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
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
