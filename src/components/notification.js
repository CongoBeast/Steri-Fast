import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

const Notification = ({ notification, onView }) => {
  const { id, message, timestamp, isRead } = notification;

  return (
    <Alert variant={isRead ? 'secondary' : 'success'} className="d-flex justify-content-between align-items-center">
      <div>
        <h5>{message}</h5>
        <p className="mb-1 text-muted">{new Date(timestamp).toLocaleString()}</p>
      </div>
      <Button variant="outline-primary" onClick={() => onView(id)}>
        View
      </Button>
    </Alert>
  );
};

export default Notification;
