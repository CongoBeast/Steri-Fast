import React, { useState , useEffect } from 'react';
import { Button, Card, Modal, Table, Form, Breadcrumb, Badge } from 'react-bootstrap';
import Breadcrumbs from './Breadcrumbs';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoTrashBinSharp } from "react-icons/io5";
import axios from 'axios';
import {  ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";


const ToolManagement = () => {

  // toast.configure();

  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);  // Loading spinner state
  const [loadingToolId, setLoadingToolId] = useState(null); 

  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(null);

  const [newTool, setNewTool] = useState({
    name: '',
    quantity: 0,
    damaged: 0,
    serialNumber: '',
    modificationDate: ''
  });


  const handleNavClick = (path) => {
    navigate(path);
  };

  const breadcrumbItems = [
    { name: 'Home', link: '/dashboard', active: false },
    { name: 'Inventory', link: '/tool-management', active: true },
  ];


  const [tools, setTools] = useState([
    { id: 1, name: 'Scalpel', quantity: 50, damaged: 5 },
    { id: 2, name: 'Forceps', quantity: 30, damaged: 2 },
    { id: 3, name: 'Suture Kit', quantity: 20, damaged: 1 },
  ]);

  const totalTools = tools.reduce((acc, tool) => acc + tool.quantity, 0);
  const totalDamaged = tools.reduce((acc, tool) => acc + tool.damaged, 0);
  const totalInStore = totalTools - totalDamaged;

  // Fetch tools when the component mounts
  const fetchTools = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tools');
      setTools(response.data);
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const generateSerialNumber = () => `TOOL-${Date.now()}`;

  const handleSaveTool = async () => {
    setIsLoading(true);  // Start spinner
    const toolData = {
      ...newTool,
      serialNumber: newTool.serialNumber || generateSerialNumber(),
      modificationDate: new Date().toISOString(),
    };
    
    try {
      let response;
      if (editMode !== null) {
        response = await axios.put(`http://localhost:3001/add-tools/${editMode}`, toolData);
        setTools((prev) => prev.map((tool) => (tool.id === editMode ? { ...tool, ...toolData } : tool)));
      } else {
        response = await axios.post('http://localhost:3001/add-tools/', toolData);
        setTools((prev) => [...prev, response.data]);
      }

       // Create notification data
       const notificationData = {
        message: `${localStorage.getItem('user')} added tool with Seriel Number: ${newTool.serialNumber}`,
        timestamp: new Date().toISOString(),
        isRead: false,
        userId: localStorage.getItem('userId')
        // status: requestStatus,
        // requesterName,
      };
  
      // Send notification creation request
      await axios.post('http://localhost:3001/create-notification', notificationData);

      toast.success('Tool saved successfully!');  // Show success toast
      fetchTools();
      setNewTool({ name: '', quantity: 0, damaged: 0 });
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to save tool.');  // Show failure toast
      console.error('Error saving tool:', error);
    } finally {
      setIsLoading(false);  // End spinner
    }
  };
  

  // Handle delete tool
  const handleDeleteTool = async (id) => {
    try {
      await axios.post(`http://localhost:3001/delete-tool/`, {_id : id});
      setTools(prevTools => prevTools.filter(tool => tool._id !== id));
      toast.success('Tool deleted successfully!');
    } catch (error) {
      console.error('Error deleting tool:', error);
      toast.error('Failed to delete tool.');
    } finally {
      setLoadingToolId(null); // Reset loading state
    }
  };

  // Open edit modal with existing tool data
  const handleEditTool = (tool) => {
    setNewTool(tool);
    setEditMode(tool.id);
    setShowModal(true);
  };

  if((localStorage.getItem("userType")) === "regular"){
    var dashboardLink = '/user-dashboard'
  }
  else{
    var dashboardLink = '/dashboard'
  }

  return (
    <div className="container mt-5">

        <Breadcrumb className='p-3 rounded'> 
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: dashboardLink }}>
            <Badge bg="primary">Home</Badge>
            </Breadcrumb.Item>
            <Breadcrumb.Item active>
            <Badge bg="success">Manage Inventory</Badge>
            </Breadcrumb.Item>
        </Breadcrumb>

      <h2>Inventory Management</h2>

      {/* Cards for Tool Statistics */}
      <div className="row my-4">
        <div className="col-md-2">
          <Card className="text-center m-1">
            <Card.Body>
              <Card.Title className='h1'>{totalTools}</Card.Title>
              <Card.Text>Total Tools</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-2 m-1">
          <Card className="text-center bg-danger text-white">
            <Card.Body>
              <Card.Title>Damaged Tools</Card.Title>
              <Card.Text>{totalDamaged}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-2 m-1">
          <Card className="text-center bg-success text-white">
            <Card.Body>
              <Card.Title>In Store</Card.Title>
              <Card.Text>{totalInStore}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Button to add new tool */}
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add New Tool
      </Button>

      {/* Tools Table */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Equipment ID</th>
            <th>Tool Name</th>
            <th>Quantity</th>
            <th>Damaged</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool, index) => (
            <tr key={tool.id}>
              <td>{tool.serialNumber}</td>
              <td>{tool.name}</td>
              <td>{tool.quantity}</td>
              <td>{tool.damaged}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditTool(tool)}
                >
                  Edit
                </Button>
                {/* <FaEdit  onClick={() => handleEditTool(tool)} /> */}
                {/* <IoTrashBinSharp  /> */}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteTool(tool._id)}
                  disabled={loadingToolId === tool._id}
                >
                  {loadingToolId === tool._id ? 'Deleting...' : 'Delete'}

                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Adding/Editing Tools */}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Tool' : 'Add New Tool'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="toolName">
              <Form.Label>Tool Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tool name"
                value={newTool.name}
                onChange={(e) =>
                  setNewTool({ ...newTool, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="toolQuantity" className="mt-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter tool quantity"
                value={newTool.quantity}
                onChange={(e) =>
                  setNewTool({ ...newTool, quantity: parseInt(e.target.value) })
                }
              />
            </Form.Group>

            <Form.Group controlId="toolDamage" className="mt-3">
              <Form.Label>Damaged</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of damaged tools"
                value={newTool.damaged}
                onChange={(e) =>
                  setNewTool({ ...newTool, damaged: parseInt(e.target.value) })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTool} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Tool'}
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ToolManagement;
