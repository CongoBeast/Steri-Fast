import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";


const PackageRequestTable = (packages) => {

  console.log(packages.packages)
  // const newPackages = packages

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
            <th>Package ID</th>
            <th>Requester Name</th>
            <th>Surgical Tools</th>
            <th>Status</th>
            <th>Room</th>
            <th>Requested At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.packages.map((pkg, index) => (
            <tr key={pkg.id}>
              <td>{pkg.packageId}</td>
              <td>{pkg.requesterName}</td>
              <td>{pkg.selectedTools.join(', ')}</td>
              <td>{pkg.requestStatus}</td>
              <td>{pkg.roomNumber}</td>
              <td>{new Date(pkg.requestDate).toLocaleString()}</td>
              <td>
                
                <FaEye />

                <FaEdit />

                <FaTrash className='btn-warning'/>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PackageRequestTable;
