import React from 'react';
import styles from './Radio.module.css';

const Radio = ({ 
  label, 
  name, 
  value, 
  checked, 
  onChange, 
  disabled = false 
}) => {
  return (
    <label className={`${styles.radioContainer} ${disabled ? styles.disabled : ''}`}>
      <div className={styles.radioWrapper}>
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={styles.radioInput}
        />
        <span className={styles.radioCircle}></span>
      </div>
      <span className={styles.label}>{label}</span>
    </label>
  );
};

export default Radio;
