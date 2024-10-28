import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation, useNavigate } from "react-router-dom";


function MainNav() {

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

  // console.log(localStorage)

  const handleNavClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // Remove token from local storage and update state
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    setIsLoggedIn(false);
    navigate('/auth'); // Redirect to home after logout
    // toggleSidebar(); // Close the sidebar after logout
  };

  if((localStorage.getItem("userType")) === "regular"){
    var dashboardLink = '/user-dashboard'
  }
  else{
    var dashboardLink = '/dashboard'
  }
       

  return (
    <>
      <br />
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://github.com/CongoBeast/Tech-News/blob/master/public/steri-logo.png?raw=true"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>

          {/* Nav items on the left */}
          <Nav className="me-auto">
            <Nav.Link onClick={() => handleNavClick(dashboardLink)}>Home</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('/about')}>About Us</Nav.Link>
            {!isLoggedIn && (
            <Nav.Link onClick={() => handleNavClick('/auth')}>Login/Sign Up</Nav.Link>
            )}

            {isLoggedIn && (
            <Nav.Link onClick={() => handleNavClick('/Notifications')}>Notifications</Nav.Link>
            )}
          </Nav>

          {/* Logout section at the end */}
          {isLoggedIn && (
          <Nav className="ms-auto d-flex align-items-center">
          <button className="btn btn-link text-decoration-none color-red" onClick={handleLogout}>Logout</button>
          </Nav>
          )}

        </Container>
      </Navbar>

    </>
  );
}

export default MainNav;