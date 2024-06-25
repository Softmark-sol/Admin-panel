import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import API_CONFIG from '../config/api';
import "../css/Orders.css"

const { apiKey } = API_CONFIG;
const { Column } = Table;

const Ordertable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/all-conatctUs-data`
        );
        console.log(response.data.data);

        // Assuming response.data is an array of objects
        setData(response.data.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="responsive">
      <Table dataSource={data} pagination={false}>
        <Column title="Sr No." dataIndex="id" key="id" />
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Number" dataIndex="phone" key="phone" />
        <Column title="Company Name" dataIndex="company" key="company" />
        <Column title="Service" dataIndex="serviceType" key="serviceType" />
        <Column title="Notes" dataIndex="message" key="message" />
        <Column title="Service Type" dataIndex="serviceType" key="serviceType" />
        <Column title="Date" dataIndex="updated_at" key="updated_at" />
      </Table>
    </div>
  );
};

export default Ordertable;
