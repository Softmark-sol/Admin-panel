import React from "react";
import LoginForm from "../Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Emailbox from "../components/Emailbox";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/checkemail" element={<Emailbox/>} />
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
