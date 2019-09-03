import React from 'react';
import { connect } from 'react-redux';

import Table from '../../shared/table';
import { setSnack, unSetSnack } from '../../../actions/snackActions';

const mapDispatchToProps = dispatch => ({
 setSnack: (snackObj) => dispatch(setSnack(snackObj)),
 unSetSnack: () => dispatch(unSetSnack()),
});

function ApplicantTable(props) {
  const { jobApplications, pagination, loading, handleTableChange } = props;

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: true,
      width: '60%',
    },
    {
      title: 'Employer',
      dataIndex: 'employer',
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

export default connect(null, mapDispatchToProps)(ApplicantTable);
