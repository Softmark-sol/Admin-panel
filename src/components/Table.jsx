import React from 'react';
import { Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;
const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const Ordertable = () => (
  <Table dataSource={data} pagination={false}>
      <Column title="Order #" dataIndex="order" key="order" />
      <Column title="Order Type" dataIndex="Ordertype" key="Ordertype" />
    <Column title="description" dataIndex="description" key="description" />
    <Column title="Order received date" dataIndex="Orderreceiveddate" key="Orderreceiveddate" />
    <Column
      title="Order received date"
      dataIndex="Orderreceiveddate"
      key="Orderreceiveddate"
    />
    <Column
      title="Requirements"
      key="Requirements"
      dataIndex="Requirements"
          />
          <Column
      title="Payment confirmation"
      key="Paymentconfirmation"
      dataIndex="Paymentconfirmation"
          />
  </Table>
);
export default Ordertable;