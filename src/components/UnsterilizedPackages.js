import React, { useState , useEffect } from 'react';
import { Button, Table, Modal, Form, Breadcrumb, Badge } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'

const UnsterilizedPackages = ({ username }) => {

  const [packages , setPackages] = useState([])
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState('');

  const fetchPackages = async () => {
    try {
      // const response = await axios.get(`http://localhost:3001/unsterilized-packages`);
      const response = await axios.get(`https://steri-fast-backend.onrender.com/unsterilized-packages`);

      // const response = await axios.get('http://localhost:3001/requests');
      
      setPackages(response.data); // Set the data to state
      // console.log(response.data)
    } catch (error) {
      console.error('Error fetching package requests:', error);
    }
  };

  const handleManageClick = (pkg) => {
    setSelectedPackage(pkg);
    setStatus(pkg.status);
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    setPackages((prevPackages) =>
      prevPackages.map((pkg) =>
        pkg.id === selectedPackage.id
          ? { ...pkg, status, receivedBy: username }
          : pkg
      )
    );
    setShowModal(false);
  };

  if((localStorage.getItem("userType")) === "regular"){
    var dashboardLink = '/user-dashboard'
  }
  else{
    var dashboardLink = '/dashboard'
  }

  useEffect(() => {
    fetchPackages();
  }, []);


  return (
    <div className="container mt-5">

        <Breadcrumb className='p-3 rounded'> 
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: dashboardLink }}>
            <Badge bg="primary">Home</Badge>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
            <Badge bg="success">Manage Packages</Badge>
            </Breadcrumb.Item>
        </Breadcrumb>


      <h2>Manage Unsterilized Packages</h2>

      {/* Table displaying the unsterilized packages */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Package Number</th>
            <th>Room</th>
            <th>Tools</th>
            <th>Damaged Tools</th>
            <th>Time Received</th>
            <th>Received By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => (
            <tr key={pkg._id}>
              <td>{index + 1}</td>
              <td>{pkg.packageId}</td>
              <td>{pkg.room}</td>
              <td>{pkg.surgicalTools.join(', ')}</td>
              <td>
                {/* {pkg.damagedTools.length > 0
                  ? pkg.damagedTools.join(', ')
                  : 'None'} */}
                  Stuff
              </td>
              <td>{pkg.timeReceived}</td>
              <td>{pkg.receivedBy}</td>
              <td>{pkg.status}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleManageClick(pkg)}
                >
                  Manage
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Managing Package */}
      {selectedPackage && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Manage Package - {selectedPackage.packageNumber}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Room:</strong> {selectedPackage.room}
            </p>
            <p>
              <strong>Tools:</strong> {selectedPackage.tools.join(', ')}
            </p>
            <p>
              <strong>Damaged Tools:</strong>{' '}
              {selectedPackage.damagedTools.length > 0
                ? selectedPackage.damagedTools.join(', ')
                : 'None'}
            </p>

            {/* Form to update package status */}
            <Form>
              <Form.Group controlId="statusSelect" className="mb-3">
                <Form.Label>Update Package Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Process">In Process</option>
                  <option value="Sterilized">Sterilized</option>
                </Form.Control>
              </Form.Group>

              {/* If there are damaged tools, allow for replacement */}
              {selectedPackage.damagedTools.length > 0 && (
                <Button
                  variant="warning"
                  onClick={() =>
                    alert(
                      `Replace damaged tools: ${selectedPackage.damagedTools.join(
                        ', '
                      )}`
                    )
                  }
                >
                  Replace Damaged Tools
                </Button>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default UnsterilizedPackages;
