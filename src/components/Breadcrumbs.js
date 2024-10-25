import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Breadcrumbs = ({ items }) => {

  const location = useLocation();
  const navigate = useNavigate();
  
  const handleNavClick = (path) => {
      navigate(path);
    };

  return (
    <Breadcrumb>
      {items.map((item, index) => (
        <Breadcrumb.Item key={index}  onClick={handleNavClick(item.link)} active={item.active}>
          <span className="badge badge-primary p-2">
            {item.name}
          </span>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
