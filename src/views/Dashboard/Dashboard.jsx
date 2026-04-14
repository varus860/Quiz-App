import React, { useState, useMemo } from 'react';
import styles from './Dashboard.module.css';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import QuizCard from '../../components/QuizCard/QuizCard';

const Dashboard = ({ quizzes, onCreateQuiz, onEditQuiz }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Drafts', 'Completed'];

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || quiz.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [quizzes, searchQuery, activeFilter]);


  const handleEdit = (quiz) => onEditQuiz(quiz);
  const handleExport = (quiz) => console.log('Export quiz:', quiz.title);
  const handleDelete = (quiz) => console.log('Delete quiz:', quiz.title);

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Quizzes</h1>
        <div className={styles.actions}>
          <Button variant="outline">Import</Button>
          <Button variant="primary" onClick={onCreateQuiz}>Create Quiz</Button>
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
