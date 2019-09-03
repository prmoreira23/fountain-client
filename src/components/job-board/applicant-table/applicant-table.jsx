import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';

import Table from '../../shared/table';
import { applyToJobOpening } from '../../../services/job-opening-services.js';
import { isUserLoggedIn } from '../../../utils/auth';
import { setSnack, unSetSnack } from '../../../actions/snackActions';

const mapDispatchToProps = dispatch => ({
 setSnack: (snackObj) => dispatch(setSnack(snackObj)),
 unSetSnack: () => dispatch(unSetSnack()),
});

function ApplicantTable(props) {
  const { jobOpenings, pagination, loading, handleTableChange, onSuccess } = props;

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

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      render: text => <a>{text}</a>,
      sorter: true,
      width: '45%',
    },
    {
      title: 'Employer',
      dataIndex: 'employer',
      render: text => <a>{text}</a>,
      width: '35%',
    },
    {
      title: 'Action',
      dataIndex: '',
      width: '20%',
      key: 'x',
      render: (row) => {
        let toolTipText = !isUserLoggedIn() ? "Must be logged in to apply to jobs." : "Click to apply to this job.";
        if(row.applied) {
          toolTipText = "Already applied to this job."
        }
        return (
        <Tooltip title={toolTipText}>
          <span>
            <Button
              disabled={!isUserLoggedIn() || row.applied}
              type="button"
              onClick={row.applied ? null : applyToJob(row.id)}
              shape="round"
            >
              {row.applied ? 'Applied' : 'Apply'}
            </Button>
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

export default connect(null, mapDispatchToProps)(ApplicantTable);
