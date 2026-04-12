import React, { useState, useMemo } from 'react';
import styles from './Dashboard.module.css';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import QuizCard from '../../components/QuizCard/QuizCard';

const DUMMY_QUIZZES = [
  {
    id: '1',
    title: 'World History: Ancient Civilizations',
    questionsCount: 20,
    attempts: 156,
    updatedAt: 'Apr 12',
    status: 'Completed'
  },
  {
    id: '2',
    title: 'Basic Algebra & Equations',
    questionsCount: 15,
    attempts: 42,
    updatedAt: 'Apr 11',
    status: 'Drafts'
  },
  {
    id: '3',
    title: 'Biology: Cell Structure',
    questionsCount: 12,
    attempts: 98,
    updatedAt: 'Apr 10',
    status: 'Completed'
  },
  {
    id: '4',
    title: 'English Literature: Introduction to Shakespeare',
    questionsCount: 10,
    attempts: 24,
    updatedAt: 'Apr 09',
    status: 'Completed'
  },
  {
    id: '5',
    title: 'World Geography: Capitals & Flags',
    questionsCount: 25,
    attempts: 0,
    updatedAt: 'Apr 08',
    status: 'Drafts'
  }
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Drafts', 'Completed'];

  const filteredQuizzes = useMemo(() => {
    return DUMMY_QUIZZES.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || quiz.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const handleEdit = (quiz) => console.log('Edit quiz:', quiz.title);
  const handleExport = (quiz) => console.log('Export quiz:', quiz.title);
  const handleDelete = (quiz) => console.log('Delete quiz:', quiz.title);

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

      <section className={styles.content}>
        {filteredQuizzes.length > 0 ? (
          <div className={styles.quizGrid}>
            {filteredQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onEdit={handleEdit}
                onExport={handleExport}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>No quizzes found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
