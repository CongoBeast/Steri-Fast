import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const AboutPage = () => {
  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="text-center mb-5">
        <img
          src="https://github.com/CongoBeast/Tech-News/blob/master/public/steri-logo.png?raw=true"  // Replace with the actual URL of the logo image
          alt="Steri-Fast Logo"
          style={{ width: "100px", height: "100px" }}
        />
        <h1 className="display-4">Steri-Fast</h1>
        <p className="lead mt-4">
          Steri-Fast is a hospital surgical equipment management system designed to streamline the process 
          of on-demand sterilization equipment requests and delivery procedures.
          It simplifies logistics, ensures timely sterilization of critical tools, 
          and reduces potential bottlenecks in surgical operations.
        </p>
      </div>

      {/* Benefits Section */}
      <div className="card bg-light shadow-lg mb-5" style={{ width: "80%" }}>
        <div className="card-body text-center">
          <h3 className="card-title text-primary">Why Use Steri-Fast?</h3>
          <ul className="list-group list-group-flush text-start mt-3">
            <li className="list-group-item">✅ Streamlined equipment request and delivery.</li>
            <li className="list-group-item">✅ Real-time tracking of sterilization processes.</li>
            <li className="list-group-item">✅ Reduced delays in surgical procedures.</li>
            <li className="list-group-item">✅ Improved coordination between departments.</li>
            <li className="list-group-item">✅ Minimized risk of equipment contamination.</li>
          </ul>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center mt-auto">
        <p className="text-muted">&copy; 2024 Steri-Fast. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
