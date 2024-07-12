import React from "react";
import { IoReceiptSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CiLocationArrow1 } from "react-icons/ci";
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
        <div className="sidebar-content" onClick={() => navigate("/")}>
          <IoReceiptSharp color="#C4D7F8" size={20} />
          <span className="sidebar-span">Orders</span>
        </div>
        <div className="sidebar-content" onClick={() => navigate("/general-inquery")}>
          <FaSearchengin color="#C4D7F8" size={20} />
          <span className="sidebar-span">General Inqueries</span>
        </div>
        <a href="http://100.27.161.181:8080/" target="new" style={{textDecoration:'none'}}>
        <div className="sidebar-content" >
        <CiLocationArrow1 color="#C4D7F8" size={20} />
          <span className="sidebar-span">All Plans Data</span>
        </div>
        </a>     
      </div>
    </div>
  );
};

export default Sidebar;
