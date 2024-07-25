import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Protected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token == Number || token.length != 6) {
      navigate("/login");
    } 
  }, []);

  return (
    <div>
      <Component />
    </div>
  );
};

export default Protected;