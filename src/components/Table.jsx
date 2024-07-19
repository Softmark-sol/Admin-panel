import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Table } from "antd";
import API_CONFIG from "../config/api";
import "../css/Orders.css";
import TextField from "@mui/material/TextField";
import Loader from "./Loader/Loader";

const { apiKey } = API_CONFIG;
const { Column } = Table;

const Ordertable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchClientId, setSearchClientId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${apiKey}/all-planes-data`
        );
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
          ...DigitalMarketing.onePlane,
        ];

        console.log("All Data Combine",combinedData)

        setData(combinedData);
        setFilteredData(combinedData);
        setTotal(response.data.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (searchClientId.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.clientId.toString().includes(searchClientId.trim())
      );
      setFilteredData(filtered);
    }
  }, [searchClientId, data]);

  const handleClientIdClick = (clientId, id) => {
    navigate(`/clientdata/${clientId}/${id}`);
  };

  const getStatusColor = (text) => {
    switch (text) {
      case "Pending":
        return "yellow";
      case "Complete":
        return "green";
      case "Cancel":
        return "red";
      case "Progress":
        return "blue";
      default:
        return "black";
    }
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
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
      {data == "" ? (
        <Loader />
      ) : (
        <Table
          onChange={handleTableChange}
          dataSource={filteredData}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
          }}
          bordered="1px"
        >
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
          <Column title="Order Type" dataIndex="plan" key="plan" />
          <Column
            title="Description"
            dataIndex="description"
            key="description"
            width={300}
          />
          <Column
            title="Order received date"
            dataIndex="updated_at"
            key="updated_at"
          />
          <Column
            className="col-center"
            title="Status"
            key="status"
            dataIndex="status"
            width={100}
            render={(text) => (
              <span
                style={{
                  backgroundColor: getStatusColor(text),
                  color: "white",
                  padding: "8px",
                  borderRadius: "10px",
                  fontWeight: "bold",
                }}
              >
                {text}
              </span>
            )}
          />
          <Column
            className="col-center"
            title="Requirements"
            key="functionalities"
            dataIndex="functionalities"
            width={100}
          />
          <Column
            title="Payment confirmation"
            key="Paymentconfirmation"
            dataIndex="Paymentconfirmation"
          />
        </Table>
      )}
    </div>
  );
};

export default Ordertable;
