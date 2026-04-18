import React, { useState, useEffect, useRef } from 'react';
import styles from './QuizRunner.module.css';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

const QuizRunner = ({ 
  quiz, 
  currentQuestionIndex = 0, 
  onExit, 
  onNext, 
  onPrev, 
  onSubmit 
}) => {
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz?.timeLimit ? quiz.timeLimit * 60 : 0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && quiz?.questions?.length > 0) {
      onSubmit(); // Auto-submit when time is up
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timeLeft, onSubmit, quiz]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <div className={styles.runner}>
        <div className={styles.exitButton}>
          <Button variant="ghost" onClick={onExit}>× Exit</Button>
        </div>
        <div className={styles.content}>
          <div className={styles.placeholder}>
            <h2>No Questions</h2>
            <p>This quiz has no questions added yet.</p>
          </div>
        </div>
      </div>
    );
  }

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleSelectChoice = (choiceIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: choiceIndex
    }));
  };

  const selectedChoice = userAnswers[currentQuestion.id];
  const unansweredCount = quiz.questions.filter(q => userAnswers[q.id] === undefined).length;

  const handleSubmitRequest = () => {
    if (unansweredCount > 0) {
      setIsSubmitModalOpen(true);
    } else {
      onSubmit(userAnswers);
    }
  };

  return (
    <div className={styles.runner}>
      <div className={styles.progressBarContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      <div className={styles.exitButton}>
        <Button variant="ghost" onClick={onExit}>
          × Exit Quiz
        </Button>
      </div>

      <header className={styles.header}>
        <div className={styles.counter}>
          QUESTION {currentQuestionIndex + 1} OF {totalQuestions}
        </div>
        <div className={`
          ${styles.timer} 
          ${timeLeft < (quiz.timeLimit * 60 * 0.2) ? styles.timerLow : ''}
          ${timeLeft < 10 ? styles.timerPulse : ''}
        `}>
          {formatTime(timeLeft)}
        </div>
      </header>

      <main className={styles.content}>
        <section className={styles.questionSection}>
          <h2 className={styles.questionPrompt}>{currentQuestion.prompt}</h2>
        </section>

        <div className={styles.choicesGrid}>
          {currentQuestion.choices.map((choice, index) => (
            <div 
              key={index}
              className={`${styles.choiceCard} ${selectedChoice === index ? styles.active : ''}`}
              onClick={() => handleSelectChoice(index)}
            >
              <div className={styles.radioIndicator}>
                <div className={styles.radioIndicatorInner}></div>
              </div>
              <span className={styles.choiceText}>{choice}</span>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <Button 
            variant="ghost" 
            onClick={onPrev} 
            disabled={isFirstQuestion}
          >
            ← Previous
          </Button>

          <div className={styles.pagination}>
            {quiz.questions.map((_, index) => (
              <div 
                key={index} 
                className={`${styles.dot} ${index === currentQuestionIndex ? styles.dotActive : ''}`}
              />
            ))}
          </div>

          {isLastQuestion ? (
            <Button variant="primary" onClick={handleSubmitRequest}>
              Submit Quiz
            </Button>
          ) : (
            <Button variant="outline" onClick={onNext}>
              Next Question →
            </Button>
          )}
        </div>
      </footer>

      <Modal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        title="Incomplete Quiz"
        footer={
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', width: '100%' }}>
            <Button variant="ghost" onClick={() => setIsSubmitModalOpen(false)}>Focus on Quiz</Button>
            <Button variant="primary" onClick={onSubmit}>Submit Anyway</Button>
          </div>
        }
      >
        <div className={styles.modalContent}>
          <div className={styles.warningBox}>
            <div className={styles.warningText}>You have {unansweredCount} unanswered questions.</div>
            <div className={styles.warningDetail}>Are you sure you want to submit your quiz now?</div>
          </div>
          <p>Once submitted, you will not be able to change your answers.</p>
        </div>
      </Modal>
    </div>
  );
};

export default QuizRunner;
