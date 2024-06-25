import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import API_CONFIG from '../config/api';

const { apiKey } = API_CONFIG;
const { Column } = Table;

const Ordertable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiKey}/all-conatctUs-data`
        );

        // Check if the response is HTML (error page) instead of JSON
        if (response.headers["content-type"].includes("text/html")) {
          console.error("Received HTML response instead of JSON.");
          return; // Exit early if HTML response received
        }

        setData(response.data); // Assuming response.data is an array of objects
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="responsive">
      <Table pagination={false}>
        <Column title="Sr No." dataIndex="id" key="id" render={(text, record, index) => index + 1}></Column>
        <Column title="Name" dataIndex="name" key="name" ></Column>
        <Column title="Email" dataIndex="email" key="email" ></Column>
        <Column title="Number" dataIndex="phone" key="phone" ></Column>
        <Column title="Company Name" dataIndex="company" key="company" ></Column>
        <Column title="Service" dataIndex="serviceType" key="serviceType" ></Column>
        <Column title="Notes" dataIndex="message" key="message" ></Column>
        {/* <Column title="Date" dataIndex="date" key="date" /> */}
      </Table>
      
      {/* Render data using .map(), conditionally */}
      {/* {Array.isArray(data) && data.length > 0 ? (
        data.map(item => (
          <div key={item.id}>
            <p>Name: {item.name}</p>
            <p>Email: {item.email}</p>
            <p>Number: {item.phone}</p>
            <p>Company Name: {item.company}</p>
            <p>Service: {item.serviceType}</p>
            <p>Notes: {item.message}</p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )} */}
    </div>
  );
};

export default Ordertable;
