import React from 'react';
import { Table } from 'antd';

import 'antd/dist/antd.css';

function TableComponent(props) {
  const { pagination, loading, handleTableChange } = props;

  return (
    <Table
      rowKey={record => record.id}
      columns={props.columns}
      dataSource={props.data}
      expandedRowRender={record => <p style={{ margin: 0, overflowWrap: 'break-word', whiteSpace: 'pre-line', maxHeight: '500px', overflow: 'hidden' }}>{record.description}</p>}
      pagination={pagination}
      loading={loading}
      onChange={handleTableChange}
    />
  );
}

export default TableComponent;
