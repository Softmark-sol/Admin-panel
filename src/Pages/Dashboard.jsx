import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import "../css/Dashboard.css";
import Orders from "./Orders";
import GeneralInquery from "./GeneralInquery";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="main-cont">
        <Sidebar />
        <Routes>
          <Route path="/orders" element={<Orders />} />
          <Route path="/general-inquery" element={<GeneralInquery />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
