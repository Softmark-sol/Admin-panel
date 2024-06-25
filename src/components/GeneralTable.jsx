import React from "react";
import { Table } from "antd";
const { Column } = Table;
import '../css/General.css'

// Generate random data for demonstration
const generateRandomData = () => {
  const data = [];
  for (let i = 1; i <= 5; i++) {
    data.push({
      key: String(i),
      srNo: i,
      name: `Person ${i}`,
      email: `person${i}@example.com`,
      number: Math.floor(Math.random() * 10000000000), 
      companyName: `Company ${i}`,
      service: `Service ${i}`,
      notes: `Notes for Person ${i}`,
      date: new Date().toLocaleDateString(), 
    });
  }
  return data;
};

const Ordertable = () => {
  const data = generateRandomData();

  return (
    <div className="responsive">
      <Table dataSource={data} pagination={false} >
      <Column title="Sr No." dataIndex="srNo" key="srNo" />
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Email" dataIndex="email" key="email" />
      <Column title="Number" dataIndex="number" key="number" />
      <Column title="Company Name" dataIndex="companyName" key="companyName" />
      <Column title="Service" dataIndex="service" key="service" />
      <Column title="Notes" dataIndex="notes" key="notes" />
      <Column title="Date" dataIndex="date" key="date" />
    </Table>
    </div>
    
  );
};

export default Ordertable;
