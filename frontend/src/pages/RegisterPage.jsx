import React from 'react';
import RegisterForm from '../components/auth/RegisterForm.jsx';
import './RegisterPage.css';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="register-page-content">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;