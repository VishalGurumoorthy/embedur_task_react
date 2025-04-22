import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Landing from "./Landing";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={loggedIn ? <Navigate to="/books" /> : <Login onLogin={() => setLoggedIn(true)} />}
        />
        <Route
          path="/books"
          element={loggedIn ? <Landing /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
