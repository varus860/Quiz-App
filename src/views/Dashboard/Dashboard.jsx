import React from 'react';
import styles from './Dashboard.module.css';
import Button from '../../components/Button/Button';

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Quizzes</h1>
        <div className={styles.actions}>
          <Button variant="outline">Import</Button>
          <Button variant="primary">Create Quiz</Button>
        </div>
      </header>

      {/* Content area for the quizzes */}
      <div className={styles.content}>
        {/* Data will be filled here */}
      </div>
    </div>
  );
};

export default Dashboard;
