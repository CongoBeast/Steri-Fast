// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from "./components/Dashboard";
import UserDashboard from "./components/UserDashboard";
import ManageRequest from "./components/ManageReq";
import ManageAllRequest from "./components/ManageReqAll";
import MainNav from './components/MainNav';
import AboutPage from './components/AboutPage';
import ToolManagement from './components/ToolManagement';
import UserManagement from './components/UserManagement';
import NotificationPage from './components/NotificationsPage';
import UnsterilizedPackages from './components/UnsterilizedPackages'
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';



function App() {
  return (
    <Router>
      <div className="d-flex">

        <Sidebar />

        <div className="container-fluid">
          <MainNav />
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/about" element={<AboutPage />} />
            {/* <Route path="/ManageRequest" element={<ManageRequest />} /> */}
            
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/tool-management" element={<ToolManagement />} />
              <Route path="/unsterilized-packages" element={<UnsterilizedPackages />} />
              <Route path="/manage-users" element={<UserManagement />} />
              <Route path="/ManageRequest" element={<ManageRequest />} />
              <Route path="/ManageRequestAll" element={<ManageAllRequest />} />
              <Route path="/Notifications" element={<NotificationPage />} />
            </Route>

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
