import React from "react";
import { Routes, Route} from "react-router-dom"
import LandingPage from "./component/pages/LandingPage";
import HomePage from "./component/pages/HomePage";
import Login from "./component/pages/Login";
import Register from "./component/pages/Register";

function RouteApp() {
    return (
      <Routes>
        <Route path="/" element={<HomePage/>}/>  
        <Route path="/user/auth" element={<Login/>}/>
        <Route path="/create/account" element={<Register/>}/>
      </Routes>
    );
}

export default RouteApp;
