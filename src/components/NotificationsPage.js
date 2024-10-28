import React, { useState, useEffect } from 'react';
import Notification from './notification';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Modal, Table, Form, Breadcrumb, Badge } from 'react-bootstrap';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      message: 'New package request submitted.',
      timestamp: '2024-10-25T10:15:30Z',
      isRead: false,
    },
    {
      id: '2',
      message: 'Package request approved.',
      timestamp: '2024-10-24T14:05:45Z',
      isRead: true,
    },
    {
      id: '3',
      message: 'Package delivered to room 102.',
      timestamp: '2024-10-23T09:20:00Z',
      isRead: false,
    },
  ]);

  const handleViewNotification = (id) => {
    // Mark the notification as read when the "View" button is clicked
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
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
            <Badge bg="success">My Notifications</Badge>
            </Breadcrumb.Item>
        </Breadcrumb>

      <h3 className="mb-4">Notifications</h3>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onView={handleViewNotification}
        />
      ))}
    </div>
  );
};

export default NotificationsPage;
