import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form , Badge, Stack, Breadcrumb } from 'react-bootstrap';
import { toast } from 'react-toastify';
// import { useParams,  Link } from 'react-router-dom';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";




const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', role: '' });
  const [editUserId, setEditUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/get-users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle modal open for adding/editing user
  const handleOpenModal = (user = { name: '', role: '' }) => {
    setNewUser(user);
    setEditUserId(user.id || null);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => setShowModal(false);

  // Save new or edited user
  const handleSaveUser = async () => {
    setIsLoading(true);
    try {
      if (editUserId) {
        // Update user
        await axios.put(`http://localhost:3001/edit-user/${editUserId}`, newUser);
        setUsers((prev) => prev.map((user) => (user.id === editUserId ? { ...user, ...newUser } : user)));
        toast.success('User updated successfully!');
      } else {
        // Add new user
        const response = await axios.post('http://localhost:3001/add-user', newUser);
        setUsers((prev) => [...prev, response.data]);
        toast.success('User added successfully!');
      }
      handleCloseModal();
      setNewUser({ name: '', role: '' });  // Clear form fields
    } catch (error) {
      toast.error('Failed to save user.');
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:3001/delete-user/${id}`);
        setUsers((prev) => prev.filter((user) => user.id !== id));
        toast.success('User deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete user.');
        console.error('Error deleting user:', error);
      }
    }
  };

  if((localStorage.getItem("userType")) === "regular"){
    var dashboardLink = '/user-dashboard'
  }
  else{
    var dashboardLink = '/dashboard'
  }

  return (
    <div className="container mt-4">


        <Breadcrumb className='p-3 rounded'> 
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: dashboardLink }}>
            <Badge bg="primary">Home</Badge>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
            <Badge bg="success">Manage Users</Badge>
            </Breadcrumb.Item>
        </Breadcrumb>

      <h3>User Management</h3>
      <Button variant="primary" onClick={() => handleOpenModal()} className="mb-3">
        Add User
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.userType}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleOpenModal(user)} className="me-2">
                  <FaEdit />
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user._id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit User */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editUserId ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                placeholder="Enter role"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save User'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;
