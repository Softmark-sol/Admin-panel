import React, { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingBar from "react-top-loading-bar";
import API_CONFIG from "../config/api";

const Emailbox = () => {
  const [userEmail, setUserEmail] = useState("");
  const [progress, setProgress] = useState(0);
  const { apiKey } = API_CONFIG;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(50);

    try {
      const res = await axios.post(
        `${apiKey}/forgot-password` ,                                                                                         
        { email: userEmail }
      );
      console.log(res)

      if (res.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid Email! ",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Email sent successfully!",
        });
        setProgress(100);

        setTimeout(() => {
          navigate("/otpform");
        }, 200);
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "enter correct email.",
      });
    }
    setProgress(100);
  };

  return (
    <div>
      <LoadingBar
        color="#4599B4"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="form">
        <form className="form_main" onSubmit={handleSubmit}>
          <p className="heading">Admin Email</p>

          <div className="inputContainer">
            <svg
              className="inputIcon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#2e2e2e"
              viewBox="0 0 16 16"
            >
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
            <input
              type="email"
              className="inputField"
              id="email"
              placeholder="Enter your Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" id="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Emailbox;
