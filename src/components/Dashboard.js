import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const Dashboard = ({ userType, username }) => {
  return (

    <div className="container vh-100 d-flex flex-column  align-items-center">
      <div className="text-center mb-5">
        <h1>Welcome {userType}</h1>
      </div>

      <div className="row text-center">
        <div className="col-md-6 mb-3">
          <button className="btn btn-primary w-100 py-3 btn-lg">
            Manage Package Requests
          </button>
        </div>
        <div className="col-md-6 mb-3">
          <button className="btn btn-dark w-500 py-3 btn-lg">
            Sterilized Packages
          </button>
        </div>
      </div>

      <div className="row text-center">
        <div className="col-md-6 mb-3">
          <button className="btn btn-success w-100 py-3 btn-lg">
            Tool Management
          </button>
        </div>
        <div className="col-md-6 mb-3">
          <button className="btn btn-warning w-100 py-3 btn-lg">
            Create Package Requests
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;

