import React from 'react';
import styles from './Input.module.css';

const Input = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  type = 'text', 
  error, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        type={type}
        className={`${styles.input} ${error ? styles.error : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Input;
