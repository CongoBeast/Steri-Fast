import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleAuth = () => {
    // Simulate successful login/signup logic
    const userType = "User Type A"; // You can change or dynamically set this based on login/signup logic
    const username = "JohnDoe";
    
    // Navigate to the dashboard after login
    navigate(`/dashboard/${userType}/${username}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="d-flex justify-content-around mb-4">
          <button
            className={`btn ${isLogin ? "btn-primary" : "btn-light"} w-50`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`btn ${!isLogin ? "btn-primary" : "btn-light"} w-50`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Enter Username" />
        </div>
        <div className="mb-3">
          <input type="password" className="form-control" placeholder="Enter Password" />
        </div>
        <button className="btn btn-primary w-100 mb-2" onClick={handleAuth}>
          {isLogin ? "Login" : "Sign Up"}
        </button>
        {isLogin && (
          <div className="text-center">
            <a href="/" className="text-decoration-none">Forgot Password?</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
