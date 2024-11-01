import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from './Breadcrumbs';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';



// const Dashboard = ({ userType, username }) => {

//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleNavClick = (path) => {
//     navigate(path);
//   };

//   const breadcrumbItems = [
//     { name: 'Home', link: '/', active: false },
//     { name: 'Inventory', link: '/inventory', active: true },
//   ];

function Dashboard() {

  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
  };


  return (


    <div className="container vh-100 d-flex flex-column justify-content-center  align-items-center">
    {/* // <div className="home-container"> */}

      <div className="text-center mb-5">
        <h1>Welcome {localStorage.getItem('user')}</h1>
      </div>

      <div className="row text-center">
        <div className="col-md-6 mb-3">
          <button className="btn btn-primary w-100 py-3 btn-md" onClick={() => handleNavClick('/ManageRequestAll')}>
            Manage Requests
          </button>
        </div>
        <div className="col-md-6 mb-3">
          <button className="btn btn-warning w-100 py-3 btn-md" onClick={() => handleNavClick("/unsterilized-packages")}>
            Manage Packages
          </button>
        </div>
      </div>

      <div className="row text-center">
        <div className="col-md-6 mb-3">
          <button className="btn btn-success w-100 py-3 btn-md"  onClick={() => handleNavClick('/tool-management')}>
            Tool Management
          </button>
        </div>

        <div className="col-md-6 mb-3">
          <button className="btn btn-dark w-100 py-3 btn-md" onClick={() => handleNavClick("/manage-users")}>
            Manage Users
          </button>
          
        </div>

      </div>

    </div>

  );
};

export default Dashboard;

