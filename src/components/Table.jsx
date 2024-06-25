import React from 'react';
import { Space, Table, Tag } from 'antd';
const { Column } = Table;
import '../css/Order.css'


const Ordertable = () => (
  <div className='responsive'>
    <Table pagination={false}>
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
  </div>


);
export default Ordertable;