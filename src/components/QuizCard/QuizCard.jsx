import React from 'react';
import { Pencil, Download, Trash2 } from 'lucide-react';
import Card from '../Card/Card';
import styles from './QuizCard.module.css';

const QuizCard = ({ quiz, onEdit, onExport, onDelete }) => {
  const { title, questionsCount, attempts, updatedAt, status } = quiz;

  return (
    <Card className={styles.quizCard}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.metadata}>
          {questionsCount} Questions | {attempts} Attempts | Updated {updatedAt}
        </p>
      </div>
      
      <div className={styles.actions}>
        <button 
          className={styles.actionButton} 
          onClick={() => onEdit(quiz)}
          aria-label="Edit Quiz"
        >
          <Pencil size={20} />
        </button>
        <button 
          className={styles.actionButton} 
          onClick={() => onExport(quiz)}
          aria-label="Export Quiz"
        >
          <Download size={20} />
        </button>
        <button 
          className={styles.actionButton} 
          onClick={() => onDelete(quiz)}
          aria-label="Delete Quiz"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </Card>
  );
};

export default QuizCard;
