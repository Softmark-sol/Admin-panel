import React from "react";
import LoginForm from "../Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import NotFound from "../components/NotFound/NotFound";
import Emailbox from "../components/Emailbox";
import Otpform from "../components/Otpform";
import Changepassword from "../components/Changepassword";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Login page */}
          <Route path="/login" element={<LoginForm />} />

          {/* Dashboard Route */}
          <Route path="/*" element={<Dashboard />} />

                    {/* Check Email Page */}
          <Route path="/checkemail" element={<Emailbox />} />

                    {/* Check Email OTP */}
          <Route path="/otpform" element={<Otpform/>} />

           {/* Change Password */}
           <Route path="/changepassword" element={<Changepassword/>} />

          {/* 404 Route */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
