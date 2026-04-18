import React, { useState, useEffect } from 'react';
import styles from './QuizEditor.module.css';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Textarea from '../../components/Textarea/Textarea';
import Toggle from '../../components/Toggle/Toggle';
import { Trash2, Pencil, ChevronUp, ChevronDown, Plus, HelpCircle } from 'lucide-react';
import QuestionModal from './components/QuestionModal/QuestionModal';

const QuizEditor = ({ quiz, onBack, onSave }) => {
  const isEditing = !!quiz;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    timeLimit: 15,
    passingScore: 60,
    showAnswers: true,
    questions: []
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    if (quiz) {
      setFormData({
        title: quiz.title || '',
        description: quiz.description || '',
        timeLimit: quiz.timeLimit || 15,
        passingScore: quiz.passingScore || 60,
        showAnswers: quiz.showAnswers !== undefined ? quiz.showAnswers : true,
        questions: quiz.questions || []
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

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleEditQuestion = (index) => {
    setEditingQuestion(formData.questions[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleSaveQuestion = (questionData) => {
    const newQuestions = [...formData.questions];
    
    if (editingIndex !== null) {
      // Edit existing
      newQuestions[editingIndex] = {
        ...questionData,
        id: editingQuestion.id // Preserve ID
      };
    } else {
      // Add new
      newQuestions.push({
        ...questionData,
        id: Date.now().toString()
      });
    }

    setFormData(prev => ({ ...prev, questions: newQuestions }));
    setIsModalOpen(false);
  };

  const handleDeleteQuestion = (index) => {
    if (confirm('Are you sure you want to delete this question?')) {
      setFormData(prev => ({
        ...prev,
        questions: prev.questions.filter((_, i) => i !== index)
      }));
    }
  };

  const handleMoveQuestion = (index, direction) => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formData.questions.length) return;

    const newQuestions = [...formData.questions];
    [newQuestions[index], newQuestions[newIndex]] = [newQuestions[newIndex], newQuestions[index]];
    
    setFormData(prev => ({ ...prev, questions: newQuestions }));
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
          <div className={styles.questionsList}>
            {formData.questions.length > 0 ? (
              formData.questions.map((question, index) => (
                <div key={question.id || index} className={styles.questionItem}>
                  <div className={styles.questionIndex}>{index + 1}</div>
                  <div className={styles.questionMain}>
                    <div className={styles.questionHeader}>
                      <span className={styles.questionType}>
                        <HelpCircle size={14} />
                        {question.type}
                      </span>
                    </div>
                    <p className={styles.questionPrompt}>{question.prompt}</p>
                  </div>
                  <div className={styles.questionActions}>
                    <div className={styles.reorderButtons}>
                      <button 
                        className={styles.actionBtn} 
                        onClick={() => handleMoveQuestion(index, 'up')}
                        disabled={index === 0}
                        title="Move Up"
                      >
                        <ChevronUp size={18} />
                      </button>
                      <button 
                        className={styles.actionBtn} 
                        onClick={() => handleMoveQuestion(index, 'down')}
                        disabled={index === formData.questions.length - 1}
                        title="Move Down"
                      >
                        <ChevronDown size={18} />
                      </button>
                    </div>
                    <div className={styles.mainActions}>
                      <button 
                        className={`${styles.actionBtn} ${styles.editBtn}`} 
                        onClick={() => handleEditQuestion(index)}
                        title="Edit Question"
                      >
                        <Pencil size={18} />
                      </button>
                      <button 
                        className={`${styles.actionBtn} ${styles.deleteBtn}`} 
                        onClick={() => handleDeleteQuestion(index)}
                        title="Delete Question"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.placeholderBox}>
                No questions added yet. Click the button below to start building your quiz.
              </div>
            )}
            
            <Button variant="outline" className={styles.addQuestionBtn} onClick={handleAddQuestion}>
              <Plus size={18} />
              Add Question
            </Button>
          </div>
        </section>
      </div>

      <QuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveQuestion}
        question={editingQuestion}
      />
    </div>
  );
};


export default QuizEditor;
