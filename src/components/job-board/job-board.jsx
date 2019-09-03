import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';

import Copyright from '../shared/copyright';
import { getJobOpenings } from '../../services/job-opening-services';
import AppBar from '../shared/app-bar';
import ApplicantTable from './applicant-table';
import EmployerTable from './employer-table';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  fab: {
    margin: theme.spacing(1),
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
}));

const mapStateToProps = state => {
  return { ...state };
};

function JobBoard(props) {
  const classes = useStyles();

  const { auth: { user } } = props;
  const role = user && user.data.attributes.role;

  const [values, setValues] = useState({ jobOpenings: [], pagination: { pageSize: 9 }, loading: true });

  const onSuccess = (id) => {
    const i = values.jobOpenings.findIndex(job => job.id === id);
    const jobOpenings = [...values.jobOpenings];
    jobOpenings[i].applied = true;
    setValues({ ...values, jobOpenings });
  }

  const Table = role === 'employer' ? EmployerTable : ApplicantTable;

  const formatJobOpening = (jobOpening) => {
    const { id, attributes } = jobOpening;
    const { title, description, employer, applied } = attributes;
    return { key: id, id, title, description, employer, applied };
  }

  const addNewJob = (event) => {
    event.preventDefault();
    props.history.push("/jobs/new");
  }

  const fetch = (params = {}) => {
    setValues({ ...values, loading: true });
    const tableParams = {
      ...params,
    };
    getJobOpenings(tableParams).then(jobOpenings => {
      const { data, meta } = jobOpenings;
      const jobs = data.map(job => formatJobOpening(job));
      const pagination = { ...values.pagination };
      pagination.total = meta.count;
      setValues({...values, jobOpenings: jobs, loading: false, pagination });
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...values.pagination };
    pager.current = pagination.current;
    setValues({
      ...values,
      pagination: pager,
    });
    fetch({ page: pagination.current });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" color="textSecondary" gutterBottom>
                { role === "employer" ? "Your Job Openings" : "Job Openings" }
              </Typography>
            </Grid>
            {
              role === "employer" && (
                <Grid item xs={12}>
                  <Fab color="primary" aria-label="add"  size="medium" className={classes.fab}>
                    <AddIcon onClick={addNewJob} />
                  </Fab>
                </Grid>
              )
            }
            <Grid item xs={12}>
              <Table
                jobOpenings={values.jobOpenings}
                pagination={values.pagination}
                loading={values.loading}
                handleTableChange={handleTableChange}
                onSuccess={onSuccess}
              />
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
      {/* End footer */}
    </div>
  );
}

export default connect(mapStateToProps, null)(JobBoard);
