import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux';

import Copyright from '../../shared/copyright';
import AppBar from '../../shared/app-bar';
import { createJobOpening, updateJobOpening } from '../../../services/job-opening-services.js';
import { setSnack, unSetSnack } from '../../../actions/snackActions';


const mapDispatchToProps = dispatch => ({
 setSnack: (snackObj) => dispatch(setSnack(snackObj)),
 unSetSnack: () => dispatch(unSetSnack()),
});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
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
  submit: {
    margin: theme.spacing(3, 3, 1, 0)
  },
}));

function Form(props) {
  const classes = useStyles();
  const [values, setValues] = useState(props.jobOpening)
  const { history, isNew } = props;

  useEffect(() => {
    const { jobOpening } = props;
    setValues(jobOpening);
  }, [props])

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({...values, [name]: value});
  }

  const saveOrUpdateJobOpening = () => {
    const { isNew } = props;
    const method = isNew ? createJobOpening : updateJobOpening;
    return method(getJobOpeningFormatted());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    saveOrUpdateJobOpening().then((res) => {
      props.setSnack({ message: `Sucessfully ${isNew ? "created" : "updated"} a Job Opening`, variant: "success", open: true });
      setTimeout(() => {
        history.push('/jobs');
        props.unSetSnack();
      }, 1000);
    }).catch(error => {
      const { errors } = error.response.data.data.attributes;
      props.setSnack({ message: "Something went wrong", variant: "error", open: true });
      setTimeout(() => props.unSetSnack(), 1000);
      setValues({ ...values, errors })
    });
  }

  const getJobOpeningFormatted = () => {
    const job = {...values};
    delete job.errors;
    return job;
  }

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" color="textSecondary" gutterBottom>
                { isNew ? "New" : "Update" } Job Opening
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="title"
                      label="Title"
                      name="title"
                      value={values.title}
                      onChange={handleInputChange}
                      error={!!values.errors['title']}
                      helperText={values.errors['title']}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="description"
                      label="Description"
                      name="description"
                      value={values.description}
                      onChange={handleInputChange}
                      error={!!values.errors['description']}
                      helperText={values.errors['description']}
                      multiline={true}
                      rows={20}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      className={classes.submit}
                    >
                      {isNew ? 'Create' : 'Update'}
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleCancel}
                      className={classes.submit}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>

        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Made with love by Pablo Rocha Moreira.
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          We help you find a new job in no time!
        </Typography>
        <Copyright />
      </footer>
    </div>
  );
}

export default withRouter(connect(null, mapDispatchToProps)(Form));
