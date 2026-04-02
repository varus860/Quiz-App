import React from 'react';
import styles from './Button.module.css';

const Button = ({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon: Icon
}) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <span className={styles.icon} aria-hidden="true"><Icon size={16} /></span>}
      {children}
    </button>
  );
};

export default Button;
