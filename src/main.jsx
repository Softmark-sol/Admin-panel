import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Loader from "./components/Loader/Loader.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense fallback={<Loader />}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);
