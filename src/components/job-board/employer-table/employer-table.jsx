import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Table from '../../shared/table';

const useStyles = makeStyles(theme => ({
  buttonLink: {
    margin: theme.spacing(1, 1.5),
    textDecoration: 'none !important',
  },
}));

function EmployerTable(props) {
  const classes = useStyles();
  const { jobOpenings, pagination, loading, handleTableChange } = props;

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: text => <a>{text}</a>,
      sorter: true,
      width: '50%',
    },
    {
      title: 'Employer',
      dataIndex: 'employer',
      render: text => <a>{text}</a>,
      width: '40%',
    },
    {
      title: 'Action',
      dataIndex: '',
      width: '10%',
      key: 'x',
      render: (row) => {
        let toolTipText = "Click to edit this job.";
        return (
        <Tooltip title={toolTipText}>
          <span>
            <Link variant="button" component={RouterLink} color="textPrimary" to={`/jobs/${row.id}/edit`} className={classes.buttonLink}>
              <Button
                type="button"
                onClick={null}
                shape="round"
              >
                Edit
              </Button>
            </Link>
          </span>
        </Tooltip>
      )},
    },
  ];

  return (
    <Table
      data={jobOpenings}
      columns={columns}
      pagination={pagination}
      loading={loading}
      handleTableChange={handleTableChange}
    />
  );
}

export default EmployerTable;
