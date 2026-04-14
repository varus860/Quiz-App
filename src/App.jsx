import React, { useState } from 'react';
import Dashboard from './views/Dashboard/Dashboard';
import QuizEditor from './views/QuizEditor/QuizEditor';

const INITIAL_QUIZZES = [
  {
    id: '1',
    title: 'World History: Ancient Civilizations',
    description: 'A comprehensive quiz covering the rise and fall of ancient civilizations across the globe.',
    questionsCount: 20,
    attempts: 156,
    updatedAt: 'Apr 12',
    status: 'Completed',
    timeLimit: 30,
    passingScore: 70,
    showAnswers: true
  },
  {
    id: '2',
    title: 'Basic Algebra & Equations',
    description: 'Test your knowledge of fundamental algebraic concepts and equation solving.',
    questionsCount: 15,
    attempts: 42,
    updatedAt: 'Apr 11',
    status: 'Drafts',
    timeLimit: 20,
    passingScore: 60,
    showAnswers: false
  },
  {
    id: '3',
    title: 'Biology: Cell Structure',
    description: 'Discover the microscopic world of cells and their intricate structures.',
    questionsCount: 12,
    attempts: 98,
    updatedAt: 'Apr 10',
    status: 'Completed',
    timeLimit: 15,
    passingScore: 75,
    showAnswers: true
  },
  {
    id: '4',
    title: 'English Literature: Introduction to Shakespeare',
    description: 'Explore the life and works of the worlds most famous playwright.',
    questionsCount: 10,
    attempts: 24,
    updatedAt: 'Apr 09',
    status: 'Completed',
    timeLimit: 25,
    passingScore: 80,
    showAnswers: true
  },
  {
    id: '5',
    title: 'World Geography: Capitals & Flags',
    description: 'How well do you know our worlds nations and their symbols?',
    questionsCount: 25,
    attempts: 0,
    updatedAt: 'Apr 08',
    status: 'Drafts',
    timeLimit: 15,
    passingScore: 50,
    showAnswers: false
  }
];

function App() {
  const [quizzes, setQuizzes] = useState(INITIAL_QUIZZES);
  const [currentView, setCurrentView] = useState('dashboard');
  const [editingQuiz, setEditingQuiz] = useState(null);

  const navigateToDashboard = () => {
    setCurrentView('dashboard');
    setEditingQuiz(null);
  };

  const navigateToEditor = (quiz = null) => {
    setCurrentView('editor');
    setEditingQuiz(quiz);
  };

  const handleSaveQuiz = (quizData) => {
    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', { month: 'short', day: '2-digit' });

    if (quizData.id) {
      // Update existing
      setQuizzes(prev => prev.map(q => q.id === quizData.id ? { 
        ...q, 
        ...quizData, 
        updatedAt: formattedDate 
      } : q));
    } else {
      // Create new
      const newQuiz = {
        ...quizData,
        id: Math.random().toString(36).substr(2, 9),
        questionsCount: 0,
        attempts: 0,
        updatedAt: formattedDate,
        status: 'Drafts'
      };
      setQuizzes(prev => [newQuiz, ...prev]);
    }
    navigateToDashboard();
  };

  return (
    <main className="container">
      {currentView === 'dashboard' ? (
        <Dashboard 
          quizzes={quizzes}
          onCreateQuiz={() => navigateToEditor()} 
          onEditQuiz={navigateToEditor} 
        />
      ) : (
        <QuizEditor 
          quiz={editingQuiz} 
          onBack={navigateToDashboard} 
          onSave={handleSaveQuiz}
        />
      )}
    </main>
  );
}


export default App;


