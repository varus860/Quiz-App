import React from 'react';
import styles from './Textarea.module.css';

const Textarea = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  error, 
  className = '',
  rows = 4,
  ...props 
}) => {
  return (
    <div className={`${styles.textareaWrapper} ${className}`}>
      {label && <label className={styles.label}>{label}</label>}
      <textarea
        className={`${styles.textarea} ${error ? styles.error : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Textarea;
