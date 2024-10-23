import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation, useNavigate } from "react-router-dom";


function MainNav() {

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
  };

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
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('/about')}>About Us</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('/auth')}>Login/Sign Up</Nav.Link>
          </Nav>

          {/* Logout section at the end */}
          <Nav className="ms-auto d-flex align-items-center">
            <button className="btn btn-link text-decoration-none">Logout</button>
            <div
              className="rounded-circle bg-primary"
              style={{
                width: "40px",
                height: "40px",
                display: "inline-block",
                marginLeft: "10px",
              }}
            ></div>
          </Nav>
        </Container>
      </Navbar>

    </>
  );
}

export default MainNav;