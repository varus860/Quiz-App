import React, { useState, useEffect } from 'react';
import styles from './QuizEditor.module.css';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Textarea from '../../components/Textarea/Textarea';
import Toggle from '../../components/Toggle/Toggle';

const QuizEditor = ({ quiz, onBack, onSave }) => {
  const isEditing = !!quiz;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    timeLimit: 15,
    passingScore: 60,
    showAnswers: true
  });

  useEffect(() => {
    if (quiz) {
      setFormData({
        title: quiz.title || '',
        description: quiz.description || '',
        timeLimit: quiz.timeLimit || 15,
        passingScore: quiz.passingScore || 60,
        showAnswers: quiz.showAnswers !== undefined ? quiz.showAnswers : true
      });
    }
  }, [quiz]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Please enter a quiz title.');
      return;
    }
    onSave({
      ...quiz,
      ...formData
    });
  };

  return (
    <div className={styles.editor}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Button variant="ghost" onClick={onBack} className={styles.backButton}>
            ← Back
          </Button>
          <h1 className={styles.title}>{isEditing ? formData.title || 'Edit Quiz' : 'New Quiz'}</h1>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline" onClick={onBack}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Quiz</Button>
        </div>
      </header>

      <div className={styles.layout}>
        {/* Left Panel: Quiz Settings */}
        <section className={styles.settingsPanel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.sectionTitle}>Quiz Settings</h2>
            <p className={styles.sectionDescription}>Configure the basic details and rules for this quiz.</p>
          </div>
          
          <div className={styles.settingsForm}>
            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>General</h3>
              <Input
                label="Quiz Title"
                placeholder="e.g., World History Basics"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
              />
              <Textarea
                label="Description"
                placeholder="Give your quiz a brief description..."
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>

            <div className={styles.formSection}>
              <h3 className={styles.formSectionTitle}>Rules</h3>
              <div className={styles.formGrid}>
                <Input
                  label="Time Limit (min)"
                  type="number"
                  min="1"
                  value={formData.timeLimit}
                  onChange={(e) => handleChange('timeLimit', parseInt(e.target.value) || 0)}
                />
                <Input
                  label="Passing Score (%)"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.passingScore}
                  onChange={(e) => handleChange('passingScore', parseInt(e.target.value) || 0)}
                />
              </div>
              <Toggle
                label="Show Answers After"
                description="Allow users to review correct answers after submitting."
                checked={formData.showAnswers}
                onChange={(val) => handleChange('showAnswers', val)}
              />
            </div>
          </div>
        </section>

        {/* Right Panel: Question List */}
        <section className={styles.questionsPanel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.sectionTitle}>Questions</h2>
            <p className={styles.sectionDescription}>Add and manage questions for your quiz.</p>
          </div>
          <div className={styles.placeholderBox}>
            Question List (Phase 9)
          </div>
        </section>
      </div>
    </div>
  );
};


export default QuizEditor;
