import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Breadcrumb, Badge } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';


const ManageRequest = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    console.log(path)
    // navigate(path);
  };

  const [packageRequests, setPackageRequests] = useState([]);

  const fetchPackageRequests = async () => {
    try {
      const response = await axios.get(`https://steri-fast-backend.onrender.com/user-requests/${localStorage.getItem('user')}`);
      // const response = await axios.get(`http://localhost:3001/user-requests/${localStorage.getItem('user')}`);

      
      setPackageRequests(response.data); // Set the data to state
      // console.log(response.data)
    } catch (error) {
      console.error('Error fetching package requests:', error);
    }
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

  const filteredRequests = packageRequests.filter(
    (pkg) =>
      pkg.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.packageId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete functionality
  const handleDelete = (id) => {
    const updatedRequests = requests.filter((pkg) => pkg.id !== id);
    setRequests(updatedRequests);
  };

  // Handle edit functionality (placeholder for now)
  const handleEdit = (id) => {
    alert(`Editing request ${id}`);
    // You can implement a modal for editing or route to an edit page.
  };

  console.log(localStorage.getItem("userType"))

  useEffect(() => {
    fetchPackageRequests();
  }, []);

  return (
    <div className="container">

        <Breadcrumb className='p-3 rounded'>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: dashboardLink }}>
            <Badge bg="primary">Home</Badge>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
            <Badge bg="success">Manage Requests</Badge>
            </Breadcrumb.Item>
        </Breadcrumb>

      <h3 className="mb-4">Manage Package Requests</h3>

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
                <td>{pkg.selectedTools.join(', ')}</td>
                <td>{pkg.requestStatus}</td>
                <td>{pkg.roomNumber}</td>
                <td>{new Date(pkg.requestDate).toLocaleString()}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(pkg.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(pkg.id)}
                  >
                    Remove
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
    </div>
  );
};

export default ManageRequest;
