import React from "react";
import { IoReceiptSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaSearchengin } from "react-icons/fa6";
import "../css/Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="sidebar-main">
        <div className="admin">
          <span className="admin-span">A D M I N &nbsp; P A N E L</span>
        </div>
        <div className="sidebar-content" onClick={() => navigate("/orders")}>
          <IoReceiptSharp color="#C4D7F8" size={20} />
          <span className="sidebar-span">Orders</span>
        </div>
        <div className="sidebar-content" onClick={() => navigate("/general-inquery")}>
          <FaSearchengin color="#C4D7F8" size={20} />
          <span className="sidebar-span">General Inqueries</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
