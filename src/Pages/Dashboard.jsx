import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import "../css/Dashboard.css";
import Orders from "./Orders";
import GeneralInquery from "./GeneralInquery";
import NotFound from "../components/NotFound/NotFound";
import ClientData from "../components/ClientData";
import Graphs from "./Graphs";
import Protected from "../components/Protected/Protected";
import UpdatePasswordModal from "../components/UpdatePasswordModal";
import Settings from "./Settings";

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
            <Route path="/" element={<Protected Component={Graphs} />} />
            <Route
              path="/general-inquery"
              element={<Protected Component={GeneralInquery} />}
            />
            <Route path="/orders" element={<Protected Component={Orders} />} />
            <Route
              path="/clientdata/:clientId/:id"
              element={<Protected Component={ClientData} />}
            />

            <Route
              path="/update-password"
              element={<Protected Component={UpdatePasswordModal} />}
            />

            <Route
              path="/settings"
              element={<Protected Component={Settings} />}
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
