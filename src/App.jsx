import React from "react";
import Router from "./config/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastNotification } from "./components/Toast/Toast";

const App = () => {
  return (
    <>
      <ToastNotification />
      <Router />
    </>
  );
};

export default App;
