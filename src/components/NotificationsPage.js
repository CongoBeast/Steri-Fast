import React, { useState, useEffect } from 'react';
import Notification from './notification';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Card, Modal, Table, Form, Breadcrumb, Badge } from 'react-bootstrap';
import axios from 'axios';


const NotificationsPage = () => {
  const [notifications2, setNotifications2] = useState([
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

  const [notifications, setNotifications] = useState([])


  // Fetch tools when the component mounts
  const fetchNotifications = async () => {
    try {
      // const response = await axios.get('http://localhost:3001/notifications');
      const response = await axios.get(`http://localhost:3001/notifications?userId=${localStorage.getItem('userId')}`);
      setNotifications(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };



  // console.log(notifications)

  const handleViewNotification = (id) => {
    // Mark the notification as read when the "View" button is clicked
    // setNotifications((prevNotifications) =>
    //   prevNotifications.map((notification) =>
    //     notification.id === id ? { ...notification, isRead: true } : notification
    //   )
    // );
  };

  if((localStorage.getItem("userType")) === "regular"){
    var dashboardLink = '/user-dashboard'
  }
  else{
    var dashboardLink = '/dashboard'
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  console.log(notifications)


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
      {notifications.length > 0 ? (
      notifications.map((notification) => (
        <Notification
          key={notification._id}
          notification={notification}
          onView={() => handleViewNotification(notification._id)}
        />
      ))
    ) : (
      <p>No notifications available</p>
    )}
    </div>
  );
};

export default NotificationsPage;
