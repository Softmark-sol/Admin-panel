import React from "react";
import LoginForm from "../Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import NotFound from "../components/NotFound/NotFound";
import Emailbox from "../components/Emailbox";
import Otpform from "../components/Otpform";
import Changepassword from "../components/Changepassword";
import Protected from "../components/Protected/Protected";
import ClientData from "../components/ClientData";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Login page */}
          <Route path="/login" element={<Protected Component={LoginForm} />} />

          {/* Dashboard Route */}
          <Route path="/*" element={<Protected Component={Dashboard} />} />

          {/* Check Email Page */}
          <Route
            path="/checkemail"
            element={<Emailbox />}
          />

          {/* Check Email OTP */}
          <Route path="/otpform" element={<Otpform />} />

          {/* Change Password */}
          <Route
            path="/changepassword"
            element={<Changepassword />}
          />

          </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
