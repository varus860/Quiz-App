import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';
import Button from '../Button/Button';

const Modal = ({ isOpen, onClose, title, children, footer }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setMounted(false), 150);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted && !isOpen) return null;

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.active : ''}`} onClick={onClose}>
      <div 
        className={`${styles.panel} ${isOpen ? styles.active : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <Button variant="ghost" onClick={onClose} className={styles.closeBtn}>
             ✕
          </Button>
        </div>
        <div className={styles.content}>
          {children}
        </div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
