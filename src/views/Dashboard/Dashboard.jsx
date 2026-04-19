import React, { useState, useMemo, useRef } from 'react';
import styles from './Dashboard.module.css';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import QuizCard from '../../components/QuizCard/QuizCard';
import Modal from '../../components/Modal/Modal';

const Dashboard = ({ quizzes, onCreateQuiz, onEditQuiz, onStartQuiz, onExportQuiz, onImportQuiz }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [pendingQuiz, setPendingQuiz] = useState(null);

  const filters = ['All', 'Drafts', 'Completed'];
  const fileInputRef = useRef(null);

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All' || quiz.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [quizzes, searchQuery, activeFilter]);


  const handleEdit = (quiz) => onEditQuiz(quiz);
  const handleExport = (quiz) => onExportQuiz(quiz);
  const handleDelete = (quiz) => console.log('Delete quiz:', quiz.title);
  
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target.result);
        onImportQuiz(json);
      } catch (error) {
        alert('Failed to parse quiz file. Please ensure it is a valid JSON.');
      }
      // Reset input value to allow importing the same file again
      event.target.value = '';
    };
    reader.readAsText(file);
  };
  const handleStartRequest = (quiz) => setPendingQuiz(quiz);
  const handleConfirmStart = () => {
    if (pendingQuiz) {
      onStartQuiz(pendingQuiz);
      setPendingQuiz(null);
    }
  };

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <h1 className={styles.title}>My Quizzes</h1>
        <div className={styles.actions}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept=".json"
            onChange={handleFileChange}
          />
          <Button variant="outline" onClick={handleImportClick}>Import</Button>
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
                onStart={handleStartRequest}
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

      <Modal
        isOpen={!!pendingQuiz}
        onClose={() => setPendingQuiz(null)}
        title="Ready to Start?"
        footer={
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="ghost" onClick={() => setPendingQuiz(null)}>Cancel</Button>
            <Button variant="primary" onClick={handleConfirmStart}>Start Quiz</Button>
          </div>
        }
      >
        {pendingQuiz && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ borderLeft: '4px solid var(--color-accent)', paddingLeft: '16px' }}>
              <h2 style={{ fontSize: '1.25rem', margin: '0 0 8px 0' }}>{pendingQuiz.title}</h2>
              <p style={{ color: 'var(--color-text-secondary)', margin: 0, lineHeight: '1.5' }}>
                {pendingQuiz.description || 'No description provided.'}
              </p>
            </div>
            <div style={{ background: 'var(--color-bg)', padding: '12px 16px', borderRadius: '8px', fontSize: '0.875rem' }}>
              <strong>Rules:</strong> {pendingQuiz.timeLimit} minutes • {pendingQuiz.passingScore}% to pass
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
