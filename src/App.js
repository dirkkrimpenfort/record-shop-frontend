import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import UserForm from './components/UserForm/UserForm';
import LoginForm from './components/LoginForm/LoginForm';

function App() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleLogin = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setIsAuthenticated(true);
    setUserName(`${data.user.firstName} ${data.user.lastName}`);
    setShowLoginForm(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserName('');
    setShowLoginForm(false);
    setShowRegistrationForm(false); 
    
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const user = JSON.parse(localStorage.getItem('user'));
      setUserName(`${user.firstName} ${user.lastName}`);
    }
  }, []);

  return (
    <div className="App">
      <Header
        isAuthenticated={isAuthenticated}
        userName={userName}
        handleLogout={handleLogout}
        showRegistrationForm={showRegistrationForm}
        toggleRegistrationForm={() => {
          setShowRegistrationForm(false);
          setShowLoginForm(true);
        }}
        showLoginForm={showLoginForm}
        toggleLoginForm={() => {
          setShowLoginForm(false);
          setShowRegistrationForm(true);
        }}
      />
      {!showRegistrationForm ? (
        isAuthenticated ? (
          null
        ) : (
          showLoginForm ? <LoginForm handleLogin={handleLogin} /> : null
        )
      ) : (
        <UserForm setShowRegistrationForm={setShowRegistrationForm} />
      )}
    </div>
  );
}

export default App;



