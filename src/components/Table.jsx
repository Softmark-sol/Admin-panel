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
          `https://aaee-2400-adc1-1c7-5400-28a4-c4ec-da94-d97f.ngrok-free.app/all-planes-data`
        );
        // console.log(response.data.data);
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

        console.log(combinedData);
        setData(combinedData); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="responsive">
      <Table dataSource={data} pagination={false}>
      <Column title="Order #" dataIndex="order" key="order" />
      <Column title="Order Type" dataIndex="plane" key="plane" />
      <Column title="description" dataIndex="description" key="description" />
      <Column title="Order received date" dataIndex="updated_at" key="updated_at
" />
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
};

export default Ordertable;


