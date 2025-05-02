import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

const API = 'http://localhost:4567';
localStorage.setItem('isLoggedIn', 'false');

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkpass, checkPassword] = useState('');

  const handleSignup = async () => {
    try {
      if(checkpass === password){
        const res = await axios.post(`${API}/signup`, { email, password });
        alert(res.data.message);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/books');
      }else{
        alert("Password doesnt match");
      }
    } catch (err) {
      alert(err.response.data.error);
      if (err.response.data.error === "User already exists") {
        navigate('/');
      }
    }
  };

  return (
    <div class="container-fluid" style={{
      backgroundImage: 'url(/bg1.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      margin: 0,
      padding: 0
    }}>
    <h1 class="position-absolute top-20 start-20 translate-top text-white  bg-dark">BOOKS @ LIB</h1>
    <div class="row"> 
    <div className="col-md-4 position-absolute top-50 start-50 translate-middle
						d-inline-flex flex-column justify-content-center border rounded p-4 shadow  bg-white">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <h6>Email</h6>
      <input placeholder="Email" className="form-control" onChange={(e) => setEmail(e.target.value)} /><br></br>
      <h6>Password</h6>
      <input placeholder="Password" type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} /><br></br>
      <h6>Confirm Password</h6>
      <input placeholder="Confirm Password" type="password" className="form-control" onChange={(e) => checkPassword(e.target.value)}/><br></br>
      <button className="btn btn-primary" onClick={handleSignup}>Sign Up</button>
    </div>
    </div>
    </div>
  );
}

export default Signup;