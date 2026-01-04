import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.scss";
import { ToastContainer } from "react-toastify";
import { Tooltip } from "react-tooltip";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Tooltip id="tooltip" style={{ zIndex: 10 }} />
    <ToastContainer />
     <App />
  </React.StrictMode>
);
