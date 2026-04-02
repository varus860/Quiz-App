import React from 'react';
import styles from './Toggle.module.css';

const Toggle = ({ 
  label, 
  checked, 
  onChange, 
  disabled = false,
  description
}) => {
  return (
    <label className={`${styles.toggleContainer} ${disabled ? styles.disabled : ''}`}>
      <div className={styles.labelSection}>
        <span className={styles.label}>{label}</span>
        {description && <span className={styles.description}>{description}</span>}
      </div>
      <div className={styles.switchWrapper}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
        <span className={styles.slider}></span>
      </div>
    </label>
  );
};

export default Toggle;
