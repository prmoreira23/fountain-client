import React from 'react';
import { withRouter } from 'react-router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { applyToJobOpening } from '../../../services/job-opening-services.js';
import { isUserLoggedIn } from '../../../utils/auth';
import { setSnack, unSetSnack } from '../../../actions/snackActions';

const useStyles = makeStyles(theme => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    flexGrow: 1,
  },
  jobDescription: {
    maxHeight: theme.spacing(15),
    overflow: 'hidden',
  },
}));

const mapDispatchToProps = dispatch => ({
 setSnack: (snackObj) => dispatch(setSnack(snackObj)),
 unSetSnack: () => dispatch(unSetSnack()),
});

const mapStateToProps = state => {
  return { ...state };
};

function JobCard(props) {
  const classes = useStyles();
  const { job, onSuccess, history } = props;
  const { auth: { user } } = props;
  const { role } = user ? user.data.attributes : {};

  const applyToJob = (id) => () => {
    applyToJobOpening(id).then((res) => {
      onSuccess(id);
      const { title } = res.data.attributes;
      props.setSnack({ message: `Sucessfully applied to "${title}"`, variant: "success", open: true });
      setTimeout(() => {
        props.unSetSnack();
      }, 1000);
    }).catch(error => {
      props.setSnack({ message: "Could not apply to job", variant: "error", open: true });
      setTimeout(() => props.unSetSnack(), 1000);
    });;
  };

  let disabled = true;
  let action = null;
  let text = "Apply";

  switch(role) {
    case "applicant":
      text = job.applied ? "Applied" : "Apply";
      disabled = !isUserLoggedIn() || job.applied;
      action = job.applied ? null : applyToJob(job.id)
      break;
    case "employer":
      text = "Edit";
      disabled = false;
      action = () => history.push(`/jobs/${job.id}/edit`)
      break;
    default:
  }

  return (
    <Grid item key={job.id} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {job.title}
          </Typography>
          <Typography className={classes.jobDescription}>
            {job.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={action}
            disabled={disabled}
          >
            { text }
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobCard));
