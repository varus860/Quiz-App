import React from 'react';
import styles from './Checkbox.module.css';

const Checkbox = ({ 
  label, 
  checked, 
  onChange, 
  disabled = false 
}) => {
  return (
    <label className={`${styles.checkboxContainer} ${disabled ? styles.disabled : ''}`}>
      <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className={styles.checkboxInput}
        />
        <span className={styles.checkboxBox}></span>
      </div>
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default Checkbox;
