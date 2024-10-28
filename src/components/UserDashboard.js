import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PackageRequestTable from './reqTable';
import { Modal, Button, Form, Toast, ToastContainer, Spinner } from "react-bootstrap";
import Select from "react-select";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = ({ userType, username }) => {

  const [packageRequests, setPackageRequests] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  const handleNavClick = (path) => {
    navigate(path);
  };

  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false); // Toast state
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [packageId, setPackageId] = useState("");
  const [selectedTools, setSelectedTools] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [criticalCode, setCriticalCode] = useState("");
  const [requesterName, setRequesterName] = useState(localStorage.getItem('user')); // New field
  const [requestStatus, setRequestStatus] = useState("Request Sent"); // New field
  const [deliveryDate, setDeliveryDate] = useState("");   // New field

  const fetchPackageRequests = async () => {
    try {
      const response = await axios.get('http://localhost:3001/requests' , {requesterName});
      setPackageRequests(response.data); // Set the data to state
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching package requests:', error);
    }
  };

  useEffect(() => {
    fetchPackageRequests();
  }, []);



  // Generate random ID on modal open
  const handleOpenModal = () => {
    const id = Math.random().toString(36).substr(2, 9).toUpperCase();
    setPackageId(id);
    setShowModal(true);
  };

  // Close modal and reset fields
  const handleClose = () => {
    setShowModal(false);
    setPackageId("");
    setSelectedTools([]);
    setRoomNumber("");
    setCriticalCode("");
    setRequesterName("");
    setRequestStatus("")
    setDeliveryDate("");
  };

  const handleCreatePackage = async () => {
    setIsLoading(true);  // Start spinner
  
    // Prepare the package data
    const packageData = {
      packageId,
      selectedTools: selectedTools.map(tool => tool.value),
      roomNumber,
      criticalCode,
      requesterName,
      requestStatus,
      deliveryDate,
      requestDate: new Date().toISOString(),  // Current date and time
    };
  
    try {
      const response = await axios.post('http://localhost:3001/create-request', packageData);
      toast.success('Package created successfully!');  // Show success toast
  
      // Update the packages list and reset the form fields
      setPackages((prev) => [...prev, response.data]);
      setPackageId("");
      setSelectedTools([]);
      setRoomNumber("");
      setCriticalCode("");
      setRequesterName("");
      setDeliveryDate("");

       // Create notification data
      const notificationData = {
      message: `Created package request ${packageId}`,
      timestamp: new Date().toISOString(),
      status: requestStatus,
      requesterName,
    };

    // Send notification creation request
    await axios.post('http://localhost:3001/create-notification', notificationData);
  
      setShowModal(false);  // Close the modal
      fetchPackageRequests()

    } catch (error) {
      toast.error('Failed to create package.');  // Show failure toast
      console.error('Error creating package:', error);
    } finally {
      setIsLoading(false);  // End spinner
    }
  };

  // Surgical tool options for the dropdown (sample data)
  const toolOptions = [
    { value: 'scalpel', label: 'Scalpel' },
    { value: 'forceps', label: 'Forceps' },
    { value: 'scissors', label: 'Scissors' },
    { value: 'suture', label: 'Suture Kit' }
  ];

  return (
    <div className="container vh-100 d-flex flex-column align-items-center">
      <div className="text-center mb-5">
        <h1>Welcome {localStorage.getItem('user')}</h1>
      </div>

      <div className="row text-center">
        <div className="col-md-6 mb-3">
          <button className="btn btn-primary w-100 py-3 btn-lg" onClick={() => handleNavClick("/ManageRequest")}>
            Manage My Requests
          </button>
        </div>
        <div className="col-md-6 mb-3">
          <button
            className="btn btn-dark w-100 py-3 btn-lg"
            onClick={handleOpenModal}
          >
            Create Packages
          </button>
        </div>
      </div>

      <h3 className="m-5">Recent Package Requests</h3>
      <PackageRequestTable packages={packageRequests}/>

      {/* Modal for Creating Package */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Package Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Package ID</Form.Label>
              <Form.Control type="text" value={packageId} readOnly />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Requester Name</Form.Label>
              <Form.Control
                type="text"
                value={requesterName}
                onChange={(e) => setRequesterName(e.target.value)}
              />
            </Form.Group> */}

            <Form.Group className="mb-3">
              <Form.Label>Select Surgical Tools</Form.Label>
              <Select
                isMulti
                options={toolOptions}
                value={selectedTools}
                onChange={setSelectedTools}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Room Number</Form.Label>
              <Form.Select
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
              >
                <option>Select Room</option>
                <option value="Theater 101">Theater 101</option>
                <option value="Theater 102">Theater 102</option>
                <option value="Theater 103">Theater 103</option>
                <option value="OR 104">OR 104</option>
                <option value="OR 105">OR 105</option>
                <option value="OR 106">OR 106</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Critical Code</Form.Label>
              <Form.Select
                value={criticalCode}
                onChange={(e) => setCriticalCode(e.target.value)}
              >
                <option>Select Critical Code</option>
                <option value="1">Code 1 (Non-Critical)</option>
                <option value="2">Code 2 (Moderate)</option>
                <option value="3">Code 3 (Critical)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Delivery Date</Form.Label>
              <Form.Control
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreatePackage} disabled={isLoading}>
            {isLoading ? <Spinner animation="border" size="sm" /> : "Create Package"}
          </Button>
        </Modal.Footer>
      </Modal>





      {/* Success/Failure Toast */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body>Package created successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default UserDashboard;
