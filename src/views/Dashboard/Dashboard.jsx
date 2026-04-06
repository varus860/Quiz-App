import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Drafts', 'Completed'];

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Quizzes</h1>
        <div className={styles.actions}>
          <Button variant="outline">Import</Button>
          <Button variant="primary">Create Quiz</Button>
        </div>
      </header>

      <section className={styles.controls}>
        <div className={styles.searchWrapper}>
          <Input
            placeholder="Search quizzes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        
        <nav className={styles.filterTabs}>
          {filters.map((filter) => (
            <button
              key={filter}
              className={`${styles.filterTab} ${activeFilter === filter ? styles.activeFilterTab : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </nav>
      </section>

      {/* Content area for the quizzes */}
      <div className={styles.content}>
        {/* Data will be filled here */}
      </div>
    </div>
  );
};

export default Dashboard;
