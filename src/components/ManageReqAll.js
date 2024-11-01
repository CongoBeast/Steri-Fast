import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Breadcrumb, Badge, Modal } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";



const ManageRequest = () => {

  const [packageRequests, setPackageRequests] = useState([]);
  // const [packageRequests, setPackageRequests] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [newCriticalCode, setNewCriticalCode] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

    // Function to handle opening the modal
  const handleEdit = (pkg) => {
      // console.log(pkg)
      setEditingPackage(pkg);
      setNewStatus(pkg.requestStatus || '');  // Set initial value
      setNewCriticalCode(pkg.criticalCode || '');  // Set initial value
      setShowEditModal(true); // Show modal
    };

    // Function to handle closing the modal
  const handleCloseModal = () => {
      setShowEditModal(false);
      setEditingPackage(null);
    };
  
  const fetchPackageRequests = async () => {
      try {
        const response = await axios.get('https://steri-fast-backend.onrender.com/requests');
        // const response = await axios.get('http://localhost:3001/requests');
        
        setPackageRequests(response.data); // Set the data to state
        // console.log(response.data)
      } catch (error) {
        console.error('Error fetching package requests:', error);
      }
    };

  // Function to handle saving the edited data
  const handleSaveEdit = async () => {
      if (!editingPackage) return;
      
      const updatedData = {
        requestStatus: newStatus,
        criticalCode: newCriticalCode,
        lastModified: new Date().toISOString(),
        receiver: localStorage.getItem("userType"),  // Get the name of editing user
      };

      console.log(updatedData)
  
      try {
        // await axios.put(`http://localhost:3001/requests/${editingPackage._id}`, updatedData);
        await axios.put(`https://steri-fast-backend.onrender.com/${editingPackage._id}`, updatedData);
        // await axios.put(`https://steri-fast-backend.onrender.com/requests/${editingPackage._id}`, updatedData);


        // Create notification data
       const notificationData = {
        message: `${localStorage.getItem('user')} updated a request for request: ${editingPackage.packageId}`,
        timestamp: new Date().toISOString(),
        isRead: false,
        userId: localStorage.getItem('userId')
        // status: requestStatus,
        // requesterName,
      };
  
      // Send notification creation request
      await axios.post('https://steri-fast-backend.onrender.com//create-notification', notificationData);
      // await axios.post('http://localhost:3001/create-notification', notificationData);
        
        
        // Update local state after successful edit
        setPackageRequests((prevRequests) =>
          prevRequests.map((pkg) =>
            pkg._id === editingPackage._id ? { ...pkg, ...updatedData } : pkg
          )
        );

        fetchPackageRequests();
  
        handleCloseModal();
      } catch (error) {
        console.error("Error updating package request:", error);
      }
    };

  const handleNavClick = (path) => {
    console.log(path)
    // navigate(path);
  };

  if((localStorage.getItem("userType")) === "regular"){
    var dashboardLink = '/user-dashboard'
  }
  else{
    var dashboardLink = '/dashboard'
  }

  const initialRequests = [
    {
      id: 'PKG12345',
      requester: 'Mark Otto',
      tools: ['Scalpel', 'Suture Kit'],
      status: 'Pending',
      room: '101',
      timestamp: '2024-10-23 10:15:30',
    },
    {
      id: 'PKG67890',
      requester: 'Jacob Thornton',
      tools: ['Forceps', 'Scissors'],
      status: 'Approved',
      room: '102',
      timestamp: '2024-10-22 14:05:45',
    },
    {
      id: 'PKG11223',
      requester: 'Larry Bird',
      tools: ['Scalpel', 'Forceps', 'Suture Kit'],
      status: 'Delivered',
      room: '103',
      timestamp: '2024-10-21 09:20:00',
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [requests, setRequests] = useState(initialRequests);

  // Handle search/filter functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetchPackageRequests();
  }, []);


  const filteredRequests = packageRequests.filter(
    (pkg) =>
      pkg.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.packageId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log(packageRequests)

  // Handle delete functionality
  const handleDelete = (_id) => {
    const updatedRequests = requests.filter((pkg) => pkg._id !== _id);
    setRequests(updatedRequests);
  };


  // console.log(localStorage.getItem("userType"))

  return (
    <div className="container">

        <Breadcrumb className='p-3 rounded'>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: dashboardLink }}>
            <Badge bg="primary">Home</Badge>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
            <Badge bg="success">Manage All Requests</Badge>
            </Breadcrumb.Item>
        </Breadcrumb>

      <h3 className="mb-4">Manage All Package Requests</h3>

      {/* Search Bar */}
      <Form className="mb-4">
        <Form.Group controlId="searchInput">
          <Form.Control
            type="text"
            placeholder="Search by requester or package ID"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>

      {/* Package Requests Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Requester Name</th>
            <th>Package ID</th>
            <th>Critical Code</th>
            <th>Surgical Tools</th>
            <th>Status</th>
            <th>Room</th>
            <th>Requested At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length > 0 ? (
            filteredRequests.map((pkg, index) => (
              <tr key={pkg.id}>
                <td>{index + 1}</td>
                <td>{pkg.requesterName}</td>
                <td>{pkg.packageId}</td>
                <td>{pkg.criticalCode}</td>
                <td>{pkg.selectedTools.join(', ')}</td>
                <td>{pkg.requestStatus}</td>
                <td>{pkg.roomNumber}</td>
                <td>{new Date(pkg.requestDate).toLocaleString()}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(pkg)}
                  >
                    <FaEdit/>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(pkg.id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No package requests found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

    {/* Modal for editing package */}
    <Modal show={showEditModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Package Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* <Form.Group controlId="editStatus">
              <Form.Label>Package Status</Form.Label>
              <Form.Control
                type="text"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              />
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="editStatus">
              <Form.Label>Room Number</Form.Label>
              <Form.Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option>Update status</option>
                <option value="Request Accepted">Request Accepted</option>
                <option value="Processing">Processing</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Packing">Packing</option>
                <option value="Delivered">Delivered</option>
                <option value="Recieved">Recieved</option>
              </Form.Select>
            </Form.Group>


            {/* <Form.Group controlId="editCriticalCode" className="mt-3">
              <Form.Label>Critical Code</Form.Label>
              <Form.Control
                type="text"
                value={newCriticalCode}
                onChange={(e) => setNewCriticalCode(e.target.value)}
              />
            </Form.Group> */}
            
            <Form.Group className="mb-3" controlId="editCriticalCode">
              <Form.Label>Critical Code</Form.Label>
              <Form.Select
                value={newCriticalCode}
                onChange={(e) => setNewCriticalCode(e.target.value)}
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageRequest;
