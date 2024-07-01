import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table } from "antd";
import API_CONFIG from "../config/api";
import "../css/Orders.css";
import TextField from "@mui/material/TextField";

const { apiKey } = API_CONFIG;
const { Column } = Table;

const Ordertable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchClientId, setSearchClientId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/all-planes-data`);
        const { DigitalMarketing, logo, seo, web, app } = response.data.data;

        const combinedData = [
          ...seo.basic.data,
          ...seo.standard.data,
          ...seo.premium.data,
          ...logo.basic.data,
          ...logo.standard.data,
          ...logo.premium.data,
          ...logo.business.data,
          ...web.basic.data,
          ...web.standard.data,
          ...web.premium.data,
          ...app.basic.data,
          ...app.standard.data,
          ...app.premium.data,
          ...DigitalMarketing.OnePlane
        ];

        setData(combinedData);
        setFilteredData(combinedData); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchClientId.trim() === "") {
      setFilteredData(data); 
    } else {
      const filtered = data.filter(item =>
        item.clientId.toString().includes(searchClientId.trim())
      );
      setFilteredData(filtered);
    }
  }, [searchClientId, data]);

  const handleClientIdClick = (clientId, id) => {
    navigate(`/clientdata/${clientId}/${id}`);
  };

  return (
    <div className="responsive">
      <div className="order-input">
        <TextField
          id="outlined-basic"
          label="Client Id"
          variant="outlined"
          style={{ width: "30%" }}
          value={searchClientId}
          onChange={(e) => setSearchClientId(e.target.value)}
        />
      </div>
      <Table dataSource={filteredData} pagination={false} bordered="1px">
        <Column
          title="Order #"
          dataIndex="clientId"
          key="clientId"
          render={(text, record) => (
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleClientIdClick(record.clientId, record.id)}
            >
              {text}
            </span>
          )}
        />
        <Column title="Order Type" dataIndex="plane" key="plane" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column
          title="Order received date"
          dataIndex="updated_at"
          key="updated_at"
        />
        <Column
          title="Requirements"
          key="functionalities"
          dataIndex="functionalities"
        />
        <Column
          title="Payment confirmation"
          key="Paymentconfirmation"
          dataIndex="Paymentconfirmation"
        />
      </Table>
    </div>
  );
};

export default Ordertable;
