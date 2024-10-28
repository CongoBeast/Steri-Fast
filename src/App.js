// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Dashboard from "./components/Dashboard";
import UserDashboard from "./components/UserDashboard";
import ManageRequest from "./components/ManageReq";
import MainNav from './components/MainNav';
import AboutPage from './components/AboutPage';
import ToolManagement from './components/ToolManagement';
import UserManagement from './components/UserManagement';
import UnsterilizedPackages from './components/UnsterilizedPackages'
import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <Router>
      <div className="container">

        <MainNav />

        <div className="mt-5">
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
            </Route>

            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/tool-management" element={<ToolManagement />} />
            <Route path="/unsterilized-packages" element={<UnsterilizedPackages />} />
            <Route path="/unsterilized-packages" element={<UnsterilizedPackages />} /> */}

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
