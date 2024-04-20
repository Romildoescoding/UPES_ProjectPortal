import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "../src/styles/styles.css";
import "../src/styles/dashboard.css";
import "../src/styles/calender.css";
import "../src/styles/events.css";
import "../src/styles/sidebar.css";
import "../src/styles/feedback.css";
import "../src/styles/objectives.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
