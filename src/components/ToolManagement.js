import React, { useState } from 'react';
import { Button, Card, Modal, Table, Form } from 'react-bootstrap';
import Breadcrumbs from './Breadcrumbs';
import { Link, useLocation, useNavigate } from "react-router-dom";



const ToolManagement = () => {


  const location = useLocation();
  const navigate = useNavigate();

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

  const [showModal, setShowModal] = useState(false);
  const [newTool, setNewTool] = useState({ name: '', quantity: 0 });
  const [editMode, setEditMode] = useState(null);

  const totalTools = tools.reduce((acc, tool) => acc + tool.quantity, 0);
  const totalDamaged = tools.reduce((acc, tool) => acc + tool.damaged, 0);
  const totalInStore = totalTools - totalDamaged;

  // Handle tool addition or editing
  const handleSaveTool = () => {
    if (editMode !== null) {
      setTools((prev) =>
        prev.map((tool) =>
          tool.id === editMode ? { ...tool, ...newTool } : tool
        )
      );
    } else {
      setTools((prev) => [
        ...prev,
        { id: tools.length + 1, ...newTool, damaged: 0 },
      ]);
    }

    setNewTool({ name: '', quantity: 0 });
    setShowModal(false);
    setEditMode(null);
  };

  // Handle delete tool
  const handleDeleteTool = (id) => {
    setTools((prev) => prev.filter((tool) => tool.id !== id));
  };

  // Open edit modal with existing tool data
  const handleEditTool = (tool) => {
    setNewTool(tool);
    setEditMode(tool.id);
    setShowModal(true);
  };

  return (
    <div className="container mt-5">

      <Breadcrumbs items={breadcrumbItems} />

      <h2>Inventory Management</h2>

      {/* Cards for Tool Statistics */}
      <div className="row my-4">
        <div className="col-md-4">
          <Card className="text-center m-2">
            <Card.Body>
              <Card.Title>Total Tools</Card.Title>
              <Card.Text>{totalTools}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 m-2">
          <Card className="text-center bg-danger text-white">
            <Card.Body>
              <Card.Title>Damaged Tools</Card.Title>
              <Card.Text>{totalDamaged}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4 m-2">
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
            <th>#</th>
            <th>Tool Name</th>
            <th>Quantity</th>
            <th>Damaged</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool, index) => (
            <tr key={tool.id}>
              <td>{index + 1}</td>
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
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteTool(tool.id)}
                >
                  Delete
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveTool}>
            Save Tool
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ToolManagement;
