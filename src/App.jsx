import React, { useState } from 'react';
import Dashboard from './views/Dashboard/Dashboard';
import QuizEditor from './views/QuizEditor/QuizEditor';
import QuizRunner from './views/QuizRunner/QuizRunner';
import QuizResults from './views/QuizResults/QuizResults';

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
    showAnswers: true,
    questions: [
      {
        id: 'q1',
        prompt: 'Which ancient civilization built the pyramids of Giza?',
        choices: ['Ancient Greece', 'Mesopotamia', 'Ancient Egypt', 'The Roman Empire'],
        correctAnswer: 2,
        type: 'Multiple Choice'
      },
      {
        id: 'q2',
        prompt: 'The Code of Hammurabi is associated with which civilization?',
        choices: ['Babylon', 'Ancient China', 'Indus Valley', 'The Maya'],
        correctAnswer: 0,
        type: 'Multiple Choice'
      },
      {
        id: 'q3',
        prompt: 'Which philosopher was a tutor to Alexander the Great?',
        choices: ['Socrates', 'Plato', 'Aristotle', 'Epicurus'],
        correctAnswer: 2,
        type: 'Multiple Choice'
      }
    ]
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
    showAnswers: false,
    questions: [
      {
        id: 'q1-alg',
        prompt: 'Solve for x: 2x + 5 = 13',
        choices: ['x = 4', 'x = 9', 'x = 3', 'x = 5'],
        correctAnswer: 0,
        type: 'Multiple Choice'
      }
    ]
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
    showAnswers: true,
    questions: [
      {
        id: 'q1-bio',
        prompt: 'Which organelle is known as the powerhouse of the cell?',
        choices: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Apparatus'],
        correctAnswer: 1,
        type: 'Multiple Choice'
      }
    ]
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
    showAnswers: true,
    questions: [
      {
        id: 'q1-lit',
        prompt: 'In which city is "Romeo and Juliet" set?',
        choices: ['Venice', 'Verona', 'Rome', 'Florence'],
        correctAnswer: 1,
        type: 'Multiple Choice'
      }
    ]
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
    showAnswers: false,
    questions: [
      {
        id: 'q1-geo',
        prompt: 'Which is the largest country by land area?',
        choices: ['Canada', 'China', 'Russia', 'USA'],
        correctAnswer: 2,
        type: 'Multiple Choice'
      }
    ]
  },
];

function App() {
  const [quizzes, setQuizzes] = useState(INITIAL_QUIZZES);
  const [currentView, setCurrentView] = useState('dashboard');
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizResults, setQuizResults] = useState(null);

  const navigateToDashboard = () => {
    setCurrentView('dashboard');
    setEditingQuiz(null);
  };

  const navigateToEditor = (quiz = null) => {
    setCurrentView('editor');
    setEditingQuiz(quiz);
  };

  const navigateToRunner = (quiz) => {
    setCurrentView('runner');
    setEditingQuiz(quiz);
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    if (editingQuiz && currentQuestionIndex < editingQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = (userAnswers) => {
    if (!editingQuiz) return;

    const totalQuestions = editingQuiz.questions.length;
    let correctCount = 0;

    editingQuiz.questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / totalQuestions) * 100);

    const results = {
      score,
      correctCount,
      totalQuestions,
      answers: userAnswers,
      quiz: editingQuiz
    };

    // Update attempts in state
    setQuizzes(prev => prev.map(q => q.id === editingQuiz.id ? {
      ...q,
      attempts: (q.attempts || 0) + 1
    } : q));

    setQuizResults(results);
    setCurrentView('results');
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

  const handleExportQuiz = (quiz) => {
    const blob = new Blob([JSON.stringify(quiz, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${quiz.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportQuiz = (quizData) => {
    if (!quizData.title || !Array.isArray(quizData.questions)) {
      alert('Invalid quiz file format.');
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleString('en-US', { month: 'short', day: '2-digit' });

    const newQuiz = {
      ...quizData,
      id: Math.random().toString(36).substr(2, 9),
      attempts: 0,
      updatedAt: formattedDate,
      status: quizData.status || 'Drafts'
    };

    setQuizzes(prev => [newQuiz, ...prev]);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="container">
            <Dashboard 
              quizzes={quizzes}
              onCreateQuiz={() => navigateToEditor()} 
              onEditQuiz={navigateToEditor}
              onStartQuiz={navigateToRunner}
              onExportQuiz={handleExportQuiz}
              onImportQuiz={handleImportQuiz}
            />
          </div>
        );
      case 'editor':
        return (
          <div className="container">
            <QuizEditor 
              quiz={editingQuiz} 
              onBack={navigateToDashboard} 
              onSave={handleSaveQuiz}
            />
          </div>
        );
      case 'runner':
        return (
          <QuizRunner 
            quiz={editingQuiz}
            currentQuestionIndex={currentQuestionIndex}
            onExit={navigateToDashboard}
            onNext={handleNextQuestion}
            onPrev={handlePrevQuestion}
            onSubmit={handleSubmitQuiz}
          />
        );
      case 'results':
        return (
          <QuizResults 
            results={quizResults}
            onFinish={navigateToDashboard}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main>
      {renderView()}
    </main>
  );
}


export default App;


