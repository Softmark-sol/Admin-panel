import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import "../css/Dashboard.css";
import Orders from "./Orders";
import GeneralInquery from "./GeneralInquery";
import NotFound from "../components/NotFound/NotFound";
import ClientData from "../components/ClientData";

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
            {/* single client data */}
          <Route
            path="/clientdata/:clientId/:id"
            element={<ClientData />}
          />

            {/* 404 Route */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
