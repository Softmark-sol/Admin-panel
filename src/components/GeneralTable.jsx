import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import API_CONFIG from "../config/api";
import "../css/Orders.css";
import Loader from "./Loader/Loader";
const { apiKey } = API_CONFIG;
const { Column } = Table;
const Ordertable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async (page, pageSize) => {
      try {
        const response = await axios.get(
          `${apiKey}/all-conatctUs-data`,
          {
            params: {
              page,
              pageSize,
            },
          }
        );

        setData(response.data.data);
        setTotal(response.data.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      finally {
        setLoading(false);
        // console.log(process.env.APIKEY)
      }
    };

    fetchData(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  return (
    <div className="responsive">
      {loading?
        <Loader />
      :
     (
        <Table
          dataSource={data}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
        >
          <Column title="Sr No." dataIndex="id" key="id" />
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Email" dataIndex="email" key="email" />
          <Column title="Number" dataIndex="phone" key="phone" />
          <Column title="Company Name" dataIndex="company" key="company" />
          <Column title="Notes" dataIndex="message" key="message" />
          <Column
            title="Service Type"
            dataIndex="serviceType"
            key="serviceType"
          />
          <Column
            title="Date"
            dataIndex="updated_at"
            key="updated_at"
            render={(text) => formatDate(text)}
          />
        </Table>
      )}
    </div>
  );
};

export default Ordertable;
