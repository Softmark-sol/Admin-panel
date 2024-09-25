import React from "react";
import { IoReceiptSharp } from "react-icons/io5";
import { useNavigate,useLocation } from "react-router-dom";
import { FaSearchengin } from "react-icons/fa6";
import { IoBarChartSharp, IoSettingsSharp } from "react-icons/io5";
import UpdatePasswordModal from "./UpdatePasswordModal";
import "../css/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-main">
        <div className="admin">
          <span className="admin-span">A D M I N &nbsp; P A N E L</span>
        </div>
        <div
          className={`sidebar-content ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <IoBarChartSharp color="#C4D7F8" size={20} />
          <span className="sidebar-span">Dashboard</span>
        </div>
        <div
          className={`sidebar-content ${location.pathname === "/orders" ? "active" : ""}`}
          onClick={() => navigate("/orders")}
        >
          <IoReceiptSharp color="#C4D7F8" size={20} />
          <span className="sidebar-span">Orders</span>
        </div>
        <div
          className={`sidebar-content ${location.pathname === "/general-inquery" ? "active" : ""}`}
          onClick={() => navigate("/general-inquery")}
        >
          <FaSearchengin color="#C4D7F8" size={20} />
          <span className="sidebar-span">General Inqueries</span>
        </div>  
        <div
          className={`sidebar-content ${location.pathname === "/settings" ? "active" : ""}`}
          onClick={() => navigate("/settings")}
        >
          <IoSettingsSharp color="#C4D7F8" size={20} />
          <span className="sidebar-span">Settings</span>
        </div>   
        <UpdatePasswordModal />
      </div>
    </div>
  );
};

export default Sidebar;
