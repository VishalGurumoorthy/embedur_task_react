import React from "react";
import { Routes, Route } from "react-router-dom";
// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Books from "./Landing";
import Signup from "./Signup";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";

function App() {
  return (
    // <Router>
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/books" element={<Books/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/adminlogin" element={<AdminLogin/>}/>
      </Routes>
    {/* // </Router> */}
    </div>
  );
}

export default App;