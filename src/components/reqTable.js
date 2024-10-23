import React from 'react';
import { Table, Button } from 'react-bootstrap';

const PackageRequestTable = () => {
  const packageRequests = [
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

  return (
    <div className="container">
      <h3 className="mb-4">Recent Package Requests</h3>
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
          {packageRequests.map((pkg, index) => (
            <tr key={pkg.id}>
              <td>{index + 1}</td>
              <td>{pkg.requester}</td>
              <td>{pkg.id}</td>
              <td>{pkg.tools.join(', ')}</td>
              <td>{pkg.status}</td>
              <td>{pkg.room}</td>
              <td>{new Date(pkg.timestamp).toLocaleString()}</td>
              <td>
                <Button variant="primary" size="sm" className="me-2">
                  View
                </Button>
                <Button variant="warning" size="sm" className="me-2">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PackageRequestTable;