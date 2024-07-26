import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_CONFIG from "../../config/api";
import Loader from "../Loader/Loader";

const Protected = ({ Component }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        else{
          setIsAuthenticated(true);

        }
      } catch (error) {
        console.error("Token verification failed", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    if (token) {
      verifyTokenWithBackend(token);

    } else {
      navigate("/login");
      setIsAuthenticated(true);
    }

  }, [navigate, token]);

  return isAuthenticated ? <Component /> : <Loader />;
};

export default Protected;
