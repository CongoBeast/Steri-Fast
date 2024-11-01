import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { IoIosInformationCircle } from "react-icons/io";
import { FaNewspaper } from "react-icons/fa6";
import './Sidebar.css';
import { IoIosNotifications , IoMdExit } from "react-icons/io";
import axios from 'axios'

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token exists in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); // Check login status on location change

  const isLinkActive = (path) => location.pathname === path;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Remove token from local storage and update state
    // Create notification data
    const notificationData = {
      message: `${localStorage.getItem('user')} logged out`,
      timestamp: new Date().toISOString(),
      isRead: false,
      userId: localStorage.getItem('userId')
      // status: requestStatus,
      // requesterName,
    };

    // Send notification creation request
    axios.post('https://steri-fast-backend.onrender.com/create-notification', notificationData);
    // axios.post('http://localhost:3001/create-notification', notificationData);

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    navigate('/auth'); // Redirect to home after logout
    // toggleSidebar(); // Close the sidebar after logout
  };

  const handleNavClick = (path) => {
    navigate(path);
    toggleSidebar(); // Close the sidebar when a navigation item is clicked
  };

  if((localStorage.getItem("userType")) === "regular"){
    var dashboardLink = '/user-dashboard'
  }
  else{
    var dashboardLink = '/dashboard'
  }

  return (
    <Navbar expand="lg" variant="light" className="flex-column d-none d-lg-block sidebar">
      <Navbar.Brand as={Link} to="/">
        <img src="https://github.com/CongoBeast/Tech-News/blob/master/public/steri-logo.png?raw=true" 
        alt="Imat Tech Logo"
          style={{  width: "150px" , height: "150px" }}
          className="d-flex align-items-center"
        />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleSidebar} />

      <Navbar.Collapse id="basic-navbar-nav" className={!isOpen && "d-none d-lg-block"}>
        <Nav className="flex-column gap-3" style={{ padding: "1rem", textAlign: "right" }}>
          <Button
            variant={isLinkActive("/home") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}
            onClick={() => handleNavClick(dashboardLink)}
          >
            <FaHome />
            <span style={{ marginLeft: "1rem" }}>Home</span>
          </Button>




          <Button
            variant={isLinkActive("/about") ? "primary" : "outline-light"}
            className="text-left d-flex align-items-center"
            style={{ marginBottom: "1rem" }}
            onClick={() => handleNavClick('/about')}
          >
            <IoIosInformationCircle />
            <span style={{ marginLeft: "1rem" }}>About Us</span>
          </Button>

          {isLoggedIn && (
            <>
              <Button
                variant={isLinkActive("/admin") ? "primary" : "outline-light"}
                className="text-left d-flex align-items-center"
                style={{ marginBottom: "1rem" }}
                onClick={() => handleNavClick('/Notifications')}
              >
                <IoIosNotifications />
                <span style={{ marginLeft: "1rem" }}>Notifications</span>
              </Button>
              <Button
                onClick={handleLogout}
                variant="outline-light"
                className="text-left d-flex align-items-center"
                style={{ marginBottom: "1rem" }}
              >
                <IoMdExit />
                <span style={{ marginLeft: "1rem" }}>Logout</span>
              </Button>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;
