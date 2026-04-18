import React from 'react';
import styles from './QuizResults.module.css';
import Button from '../../components/Button/Button';
import { Check, X, ArrowLeft } from 'lucide-react';

const QuizResults = ({ results, onFinish }) => {
  if (!results) return null;

  const { score, correctCount, totalQuestions, answers, quiz } = results;
  const isPassed = score >= quiz.passingScore;

  return (
    <div className={styles.container}>
      <header className={styles.summary}>
        <div className={`${styles.scoreCircle} ${!isPassed ? styles.fail : ''}`}>
          {score}%
        </div>
        <div className={`${styles.statusText} ${isPassed ? styles.pass : styles.fail}`}>
          {isPassed ? 'Quiz Passed!' : 'Quiz Failed'}
        </div>
        <div className={styles.details}>
          You got {correctCount} out of {totalQuestions} questions correct.
        </div>
      </header>

      <section className={styles.reviewSection}>
        <h3 className={styles.reviewTitle}>Question Review</h3>
        {quiz.questions.map((question, index) => {
          const userAnswerIndex = answers[question.id];
          const isCorrect = userAnswerIndex === question.correctAnswer;
          
          return (
            <div key={question.id} className={styles.questionCard}>
              <div className={`${styles.cardIcon} ${isCorrect ? styles.iconCorrect : styles.iconIncorrect}`}>
                {isCorrect ? <Check size={20} /> : <X size={20} />}
              </div>
              
              <div className={styles.cardContent}>
                <div className={styles.questionPrompt}>
                  {index + 1}. {question.prompt}
                </div>
                
                <div className={styles.answersGrid}>
                  <div className={styles.answerRow}>
                    <span className={styles.label}>Your Answer:</span>
                    <span className={`${styles.value} ${!isCorrect ? styles.fail : ''}`}>
                      {userAnswerIndex !== undefined 
                        ? question.choices[userAnswerIndex] 
                        : 'No Answer'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className={styles.answerRow}>
                      <span className={styles.label}>Correct Answer:</span>
                      <span className={`${styles.value} ${styles.pass}`}>
                        {question.choices[question.correctAnswer]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <div className={styles.actions}>
        <Button variant="primary" onClick={onFinish}>
          Finish & Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
