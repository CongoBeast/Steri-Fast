import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import PackageRequestTable from './reqTable';
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { Link, useLocation, useNavigate } from "react-router-dom";



const UserDashboard = ({ userType, username }) => {

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
  };

  const [showModal, setShowModal] = useState(false);
  const [packageId, setPackageId] = useState("");
  const [selectedTools, setSelectedTools] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [criticalCode, setCriticalCode] = useState("");

  // Generate random ID on modal open
  const handleOpenModal = () => {
    const id = Math.random().toString(36).substr(2, 9).toUpperCase();
    setPackageId(id);
    setShowModal(true);
  };

  // Close modal
  const handleClose = () => setShowModal(false);

  // Surgical tool options for the dropdown (sample data)
  const toolOptions = [
    { value: 'scalpel', label: 'Scalpel' },
    { value: 'forceps', label: 'Forceps' },
    { value: 'scissors', label: 'Scissors' },
    { value: 'suture', label: 'Suture Kit' }
  ];

  return (

    <div className="container vh-100 d-flex flex-column  align-items-center">
      <div className="text-center mb-5">
        <h1>Welcome {userType}</h1>
      </div>

      <div className="row text-center">
        <div className="col-md-6 mb-3">
          <button className="btn btn-primary w-100 py-3 btn-lg" onClick={() => handleNavClick("/ManageRequest")}>
            Manage Package Requests
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
      <PackageRequestTable />

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
                <option value="101">Room 101</option>
                <option value="102">Room 102</option>
                <option value="103">Room 103</option>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { /* handle package creation */ }}>
            Create Package
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default UserDashboard;

