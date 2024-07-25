import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_CONFIG from "../../config/api";

const Protected = ({ Component }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const verifyTokenWithBackend = async (token) => {
      const { apiKey } = API_CONFIG;
      try {
        const response = await axios.post(
          `${apiKey}/verify-token`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );


        if (response.data.code !== 200) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Token verification failed", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    verifyTokenWithBackend(token);
  }, [navigate, token]);

  return <Component />;
};

export default Protected;
