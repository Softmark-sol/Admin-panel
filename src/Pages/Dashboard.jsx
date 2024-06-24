import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import "../css/Dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="main-cont">
        <Sidebar />
        <Routes>
          {/* <Route path="/home" element={<Home />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
