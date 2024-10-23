// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AuthPage from './components/AuthPage';
import Dashboard from "./components/Dashboard";
import UserDashboard from "./components/UserDashboard";
import ManageRequest from "./components/ManageReq";
import MainNav from './components/MainNav';
import AboutPage from './components/AboutPage';


function App() {
  return (
    <Router>
      <div className="container">

        <MainNav />

        <div className="mt-5">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/ManageRequest" element={<ManageRequest />} />
            <Route path="/dashboard/:userType/:username" element={<Dashboard />} />
            <Route path="/user-dashboard/:userType/:username" element={<UserDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
