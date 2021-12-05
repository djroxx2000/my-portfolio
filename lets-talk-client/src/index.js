import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { GlobalProvider } from "./contexts/Globals/GlobalProvider";
import App from "./components/App";
import StarCanvas from "./components/utilities/StarCanvas";

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <StarCanvas />
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
