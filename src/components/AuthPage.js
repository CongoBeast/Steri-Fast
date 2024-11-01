// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const navigate = useNavigate();

//   const handleAuth = () => {
//     // Simulate successful login/signup logic
//     const userType = "User Type A"; // You can change or dynamically set this based on login/signup logic
//     const username = "JohnDoe";
    
//     // Navigate to the dashboard after login
//     navigate(`/dashboard/${userType}/${username}`);
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100">
//       <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
//         <div className="d-flex justify-content-around mb-4">
//           <button
//             className={`btn ${isLogin ? "btn-primary" : "btn-light"} w-50`}
//             onClick={() => setIsLogin(true)}
//           >
//             Login
//           </button>
//           <button
//             className={`btn ${!isLogin ? "btn-primary" : "btn-light"} w-50`}
//             onClick={() => setIsLogin(false)}
//           >
//             Sign Up
//           </button>
//         </div>
//         <div className="mb-3">
//           <input type="text" className="form-control" placeholder="Enter Username" />
//         </div>
//         <div className="mb-3">
//           <input type="password" className="form-control" placeholder="Enter Password" />
//         </div>
//         <button className="btn btn-primary w-100 mb-2" onClick={handleAuth}>
//           {isLogin ? "Login" : "Sign Up"}
//         </button>
//         {isLogin && (
//           <div className="text-center">
//             <a href="/" className="text-decoration-none">Forgot Password?</a>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthPage;
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, ToggleButtonGroup, ToggleButton, Spinner, Alert, Nav } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const bcrypt = require('bcryptjs');


function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
    userType: 'regular',
    userPosition: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  var navString = ''

  const handleToggle = (value) => {
    setIsLogin(value === 1);
    setFormData({ ...formData, email: '', confirmPassword: '' });
    setError('');
    setMessage('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  

  const validateForm = () => {
    if (!isLogin) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Invalid email address');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    return true;
  };

  const generateUserId = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }



    setLoading(true);
    const endpoint = isLogin ? 'login' : 'register';
    const saltRounds = 10;

    const updatedFormData = {
      ...formData,
      userId: isLogin ? formData.userId : generateUserId(),
    };
  
    // formData.password = bcrypt.hash(formData.password, saltRounds)
    axios.post(`http://localhost:3001/${endpoint}`, updatedFormData)
      .then(response => {

        if(updatedFormData.userType === "regular"){
          navString = "/user-dashboard"
        }
        else{
          navString = "/dashboard"
        }

        if(isLogin){
          var message = `${updatedFormData.username} login successful`
          
        }
        else{
          var message = `${updatedFormData.username} sign up successful`
        }


        // console.log(formData)
        // Create notification data
      const notificationData = {
        message: message,
        timestamp: new Date().toISOString(),
        userId: updatedFormData.userId,
        isRead: false
        // status: requestStatus,
        // requesterName,
      };
  
      // Send notification creation request
      axios.post('http://localhost:3001/create-notification', notificationData);

        setLoading(false);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', formData.username);
          // localStorage.setItem('user', formData.username);
          localStorage.setItem('userType', formData.userType);

          if (!isLogin) { localStorage.setItem('userId', updatedFormData.userId); }

          navigate(navString);
        } else {
          setMessage('Operation successful');
        }
      })
      .catch(error => {
        setLoading(false);
        setError(error.response ? error.response.data.message : 'An error occurred');
      });
  };


  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <ToggleButtonGroup type="radio" name="authType" defaultValue={1} className="mb-3" onChange={handleToggle}>
            <ToggleButton id="tbg-radio-1" value={1} variant="outline-primary">
              Sign In
            </ToggleButton>
            <ToggleButton id="tbg-radio-2" value={2} variant="outline-success">
              Sign Up
            </ToggleButton>
          </ToggleButtonGroup>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={(e) => handleSubmit(e)}>
            {!isLogin && (
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange} />
              </Form.Group>
            )}

            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" name="username" value={formData.username} onChange={handleChange} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>

            {!isLogin && (
              <>
                <Form.Group controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </Form.Group>
                <Form.Group controlId="formUserType">
                  <Form.Label>User Type</Form.Label>
                  <Form.Control as="select" name="userType" value={formData.userType} onChange={handleChange}>
                    <option value="regular">Regular</option>
                    <option value="admin">Admin</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formUserPosition">
                  <Form.Label>User Position</Form.Label>
                  <Form.Control as="select" name="userPosition" value={formData.userPosition} onChange={handleChange}>
                    <option value="surgeon">Surgeon</option>
                    <option value="nurse">Nurse</option>
                    <option value="assistant surgeon">Assistant Surgeon</option>
                    <option value="admin supervisor">Admin Supervisor</option>
                  </Form.Control>
                </Form.Group>
              </>
            )}

            <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
              {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthPage;
