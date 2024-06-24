import React from "react";
import LoginForm from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
