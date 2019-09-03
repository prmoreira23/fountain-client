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
  const { jobApplications, pagination, loading, handleTableChange } = props;

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'title',
      render: text => <a>{text}</a>,
      sorter: true,
      width: '50%',
    },
    {
      title: 'Applicant',
      dataIndex: 'applicant',
      render: text => <a>{text}</a>,
      width: '40%',
    },
  ];

  return (
    <Table
      data={jobApplications}
      columns={columns}
      pagination={pagination}
      loading={loading}
      handleTableChange={handleTableChange}
    />
  );
}

export default EmployerTable;
