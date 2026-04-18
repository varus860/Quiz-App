import React, { useState, useEffect } from 'react';
import styles from './QuestionModal.module.css';
import Modal from '../../../../components/Modal/Modal';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import Textarea from '../../../../components/Textarea/Textarea';
import Radio from '../../../../components/SelectionControls/Radio';
import { Plus, Trash2 } from 'lucide-react';

const QuestionModal = ({ isOpen, onClose, onSave, question }) => {
  const [localQuestion, setLocalQuestion] = useState({
    prompt: '',
    choices: ['', ''],
    correctAnswer: 0,
    type: 'Multiple Choice'
  });

  useEffect(() => {
    if (question) {
      setLocalQuestion({
        ...question,
        choices: question.choices.length > 0 ? [...question.choices] : ['', ''],
        correctAnswer: question.correctAnswer !== undefined ? question.correctAnswer : 0
      });
    } else {
      setLocalQuestion({
        prompt: '',
        choices: ['', ''],
        correctAnswer: 0,
        type: 'Multiple Choice'
      });
    }
  }, [question, isOpen]);

  const handlePromptChange = (e) => {
    setLocalQuestion(prev => ({ ...prev, prompt: e.target.value }));
  };

  const handleChoiceChange = (index, value) => {
    const newChoices = [...localQuestion.choices];
    newChoices[index] = value;
    setLocalQuestion(prev => ({ ...prev, choices: newChoices }));
  };

  const addChoice = () => {
    if (localQuestion.choices.length < 5) {
      setLocalQuestion(prev => ({
        ...prev,
        choices: [...prev.choices, '']
      }));
    }
  };

  const removeChoice = (index) => {
    if (localQuestion.choices.length > 2) {
      const newChoices = localQuestion.choices.filter((_, i) => i !== index);
      let newCorrect = localQuestion.correctAnswer;
      
      // Adjust correct answer index if removed choice was before it
      if (index === localQuestion.correctAnswer) {
        newCorrect = 0;
      } else if (index < localQuestion.correctAnswer) {
        newCorrect -= 1;
      }
      
      setLocalQuestion(prev => ({
        ...prev,
        choices: newChoices,
        correctAnswer: newCorrect
      }));
    }
  };

  const handleCorrectChange = (index) => {
    setLocalQuestion(prev => ({ ...prev, correctAnswer: parseInt(index) }));
  };

  const validate = () => {
    if (!localQuestion.prompt.trim()) {
      alert('Please enter a question prompt.');
      return false;
    }
    if (localQuestion.choices.some(choice => !choice.trim())) {
      alert('All choices must have text.');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(localQuestion);
    }
  };

  const footer = (
    <div className={styles.footerActions}>
      <Button variant="ghost" onClick={onClose}>Cancel</Button>
      <Button variant="primary" onClick={handleSave}>Save Question</Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={question ? 'Edit Question' : 'Add Question'}
      footer={footer}
    >
      <div className={styles.form}>
        <div className={styles.section}>
          <Textarea
            label="Question Prompt"
            placeholder="Enter your question here..."
            value={localQuestion.prompt}
            onChange={handlePromptChange}
            rows={3}
          />
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Choices</h3>
          <div className={styles.choicesList}>
            {localQuestion.choices.map((choice, index) => (
              <div key={index} className={styles.choiceRow}>
                <div className={styles.radioWrapper}>
                  <Radio
                    name="correct-choice"
                    value={index}
                    checked={localQuestion.correctAnswer === index}
                    onChange={() => handleCorrectChange(index)}
                    label=""
                  />
                </div>
                <div className={styles.choiceInputWrapper}>
                  <Input
                    placeholder={`Choice ${index + 1}`}
                    value={choice}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                  />
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeChoice(index)}
                  disabled={localQuestion.choices.length <= 2}
                  title="Remove Choice"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          
          {localQuestion.choices.length < 5 && (
            <Button 
              variant="ghost" 
              className={styles.addChoiceBtn} 
              onClick={addChoice}
            >
              <Plus size={16} style={{ marginRight: '8px' }} />
              Add Choice
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default QuestionModal;
