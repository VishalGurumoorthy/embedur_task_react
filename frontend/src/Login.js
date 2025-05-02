import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const API = 'http://localhost:4567';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API}/login`, { email, password });
      alert(res.data.message);
      localStorage.setItem('email', res.data.email);
      localStorage.setItem('isLoggedIn', 'true');

      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if(isLoggedIn){
        navigate('/books');
      }
    } catch (err) {
      alert(err.response.data.error);
      if (err.response.data.error === "First Time user : Sign in") {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn){
          navigate('/signup');
        }
      }
    }
  };

  return (
    <>
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
            <div class="col-md-4 position-absolute top-50 start-50 translate-middle
						d-inline-flex flex-column justify-content-center border rounded p-4 shadow  bg-white">
                <h2 className="text-2xl mb-4">Login</h2>
                <h6>Email</h6>
                <input placeholder="Email" className="form-control" onChange={(e) => setEmail(e.target.value)} /><br></br>
                <h6>Password</h6>
                <input placeholder="Password" type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} /><br></br>
                <button className="btn btn-primary " onClick={handleLogin}>Login</button>
                <p class="align-items-center">Dont have an account? <a href="http://localhost:3000/signup">Signup</a></p>
                <p class="align-items-center">Login as Admin? <a href="http://localhost:3000/adminlogin">Admin Login</a></p>  
            </div>
        </div>
    </div>
    </>


  );
}

export default Login;