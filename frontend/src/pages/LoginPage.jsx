import React from 'react';
import LoginForm from '../components/auth/LoginForm.jsx';
import './LoginPage.css';

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="login-page-content">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;