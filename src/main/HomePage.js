import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import Signup from '../components/Signup';
import Navbar from '../components/Navbar';
import AddEmployee from '../EmployeeCrud/AddEmployee';
import ViewEmployees from '../EmployeeCrud/ViewEmployees';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showViewEmployees, setShowViewEmployees] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (role) => {
    setUserRole(role);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserRole(null);
    navigate('/login');
  };

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  const handleShowSignupForm = () => {
    setShowLoginForm(false);
    setShowSignupForm(true);
  };

  const handleViewEmployees = () => {
    setShowViewEmployees(true);
    setShowAddEmployee(false);
  };

  const handleAddEmployee = () => {
    setShowAddEmployee(true);
    setShowViewEmployees(false);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="home-page-container">
      <Navbar loggedIn={loggedIn} onLogout={handleLogout} onShowLoginForm={handleShowLoginForm} onShowSignupForm={handleShowSignupForm} />
      {loggedIn && (
        <div className="logged-in-message">
          <h2>Welcome back, {userRole === 'ROLE_MODERATOR' ? 'ROLE_MODERATOR!!' : userRole}!</h2>
        </div>
      )}
      {!loggedIn ? (
        <div>
          {showLoginForm && <LoginForm setUserRole={handleLogin} setLoggedIn={setLoggedIn} />}
          {showSignupForm && <Signup />}
          {!showLoginForm && !showSignupForm && (
            <div className="welcome-message">
              <h2>Welcome to the Home Page!</h2>
              <p className="feature-message">Please login or signup to access the features.</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="button-box">
            <button onClick={handleViewEmployees}>View Employees</button>
            {userRole === 'ROLE_ADMIN' && <button onClick={handleAddEmployee}>Add Employee</button>}
          </div>
          {showViewEmployees && <ViewEmployees handleDeleteEmployee={() => {}} fetchEmployees={() => {}} userRole={userRole} />}
          {showAddEmployee && <AddEmployee showAlert={setShowAlert} />}
          {showAlert && (
            <div className="alert-message">
              <p>Employee created successfully!</p>
              <button onClick={handleAlertClose}>Close</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
