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
        <div className="left">
        <Sidebar />
        </div>
        <div className="right">
        <Routes>
          <Route path="/" element={<Orders />} />
          <Route path="/general-inquery" element={<GeneralInquery />} />
        </Routes></div>
      </div>
    </div>
  );
};

export default Dashboard;
