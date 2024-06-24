import React from "react";
import Avatar from "@mui/material/Avatar";
// import Icon from "../assets/images/icon.jpg";
import "../css/Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div style={{ paddingLeft: "50px" }}>
        <span className="navbar-h">
          SCHEDULING SYSTEM
        </span>
      </div>
      <div
        style={{
          paddingRight: "50px",
          cursor: "pointer",
        }}>
        {/* <Avatar alt="profile-icon" src={Icon} /> */}
      </div>
    </div>
  );
};

export default Navbar;
