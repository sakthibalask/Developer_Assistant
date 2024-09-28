import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'
// import 'boxicons';
import 'boxicons/css/boxicons.min.css';
import RouteApp from "./Router";
import './index.css';





const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
   
      <Router>
          <RouteApp/>
      </Router>
    </React.StrictMode>
);


