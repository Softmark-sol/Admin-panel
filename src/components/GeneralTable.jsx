import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
const { Column } = Table;
import API_CONFIG from '../config/api'; 

const { apiKey } = API_CONFIG;

const Ordertable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiKey}/all-conatctUs-data`
        );
        setData(response.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // dataSource={data}

  return (
    <div className="responsive">
      <Table  pagination={false}>
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
