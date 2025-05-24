import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  fullWidth = false,
  className = '',
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`button ${variant} ${size} ${fullWidth ? 'full-width' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;