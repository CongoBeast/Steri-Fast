import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from './Breadcrumbs';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import MetricsCards from './MetricsCards';


function Dashboard() {

  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
  };


  const metrics = [
    {value: 45 , label: "Damaged tools"},
    {value: 37 , label: "Unsterilized packs"},
    {value: 28 , label: "Requests"},
    {value: 45 , label: "Users"}
  ]


  return (


    <div className="container vh-100 d-flex flex-column  mt-5 align-items-center">
    {/* // <div className="home-container"> */}

      <div className="text-center mb-5">
        <h1 className="display-4">Welcome {localStorage.getItem('user')}</h1>
      </div>

      <MetricsCards metrics={metrics} className="mb-10" />

      <div className="row text-center">
        <div className="col-md-3 mb-3">
          <button className="btn btn-primary w-100" onClick={() => handleNavClick('/ManageRequestAll')}>
            Manage Requests
          </button>
        </div>

        <div className="col-md-3 mb-3">
          <button className="btn btn-warning w-100" onClick={() => handleNavClick("/unsterilized-packages")}>
            Manage Packages
          </button>
        </div>

        <div className="col-md-3 mb-3">
          <button className="btn btn-success w-100"  onClick={() => handleNavClick('/tool-management')}>
            Manage Tools
          </button>
        </div>

        <div className="col-md-3 mb-3">
          <button className="btn btn-dark w-100" onClick={() => handleNavClick("/manage-users")}>
            Manage Users
          </button>
        </div>
        
      </div>

    </div>

  );
};

export default Dashboard;

