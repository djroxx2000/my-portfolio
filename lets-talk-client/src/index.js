import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { GlobalProvider } from "./contexts/Globals/GlobalProvider";
import App from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
