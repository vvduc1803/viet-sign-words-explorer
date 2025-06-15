
import React, { useState, useEffect } from 'react';
import { themes, VocabularyItem, getPersonalCollection } from '../data/vocabulary';
import CameraPractice from '../components/CameraPractice';
import PersonalCollection from '../components/PersonalCollection';
import PracticeSetup from '../components/practice/PracticeSetup';
import PracticeProgress from '../components/practice/PracticeProgress';
import QuizQuestion from '../components/practice/QuizQuestion';
import CameraPracticeQuestion from '../components/practice/CameraPracticeQuestion';
import PracticeResults from '../components/practice/PracticeResults';
import { Question } from '../components/practice/types';
import { generateQuestions } from '../components/practice/utils';

const Practice = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [practiceMode, setPracticeMode] = useState<'quiz' | 'camera'>('quiz');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [showCameraPractice, setShowCameraPractice] = useState(false);
  const [cameraScores, setCameraScores] = useState<number[]>([]);
  const [showPersonalCollection, setShowPersonalCollection] = useState(false);
  const [personalCollectionWords, setPersonalCollectionWords] = useState<VocabularyItem[]>([]);

  // Check URL params to show personal collection
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'collection') {
      setShowPersonalCollection(true);
    }
  }, []);

  // Load personal collection words
  useEffect(() => {
    setPersonalCollectionWords(getPersonalCollection());
  }, []);

  const startGame = (usePersonalCollection: boolean = false) => {
    const newQuestions = generateQuestions(selectedTheme, practiceMode, usePersonalCollection, personalCollectionWords);
    if (newQuestions.length === 0) {
      alert('Bộ sưu tập cá nhân của bạn chưa có từ nào. Hãy thêm từ vào bộ sưu tập trước!');
      return;
    }
    
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(new Array(newQuestions.length).fill(false));
    setGameStarted(true);
    setGameFinished(false);
    setCameraScores([]);
    setShowPersonalCollection(false);
  };

  const selectAnswer = (wordId: string) => {
    if (answered[currentQuestion]) return;
    setSelectedAnswer(wordId);
  };

  const checkAnswer = () => {
    if (!selectedAnswer || answered[currentQuestion]) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer.id;
    const newAnswered = [...answered];
    newAnswered[currentQuestion] = true;
    setAnswered(newAnswered);

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      
      // Hiển thị camera practice nếu là loại camera-practice
      if (questions[currentQuestion + 1].type === 'camera-practice') {
        setShowCameraPractice(true);
      }
    } else {
      setGameFinished(true);
    }
  };

  const handleCameraPracticeComplete = (cameraScore: number) => {
    const newCameraScores = [...cameraScores, cameraScore];
    setCameraScores(newCameraScores);
    
    // Tính điểm cho camera practice (70+ = pass)
    if (cameraScore >= 70) {
      setScore(score + 1);
    }
    
    const newAnswered = [...answered];
    newAnswered[currentQuestion] = true;
    setAnswered(newAnswered);
    setShowResult(true);
    setShowCameraPractice(false);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameFinished(false);
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered([]);
    setCameraScores([]);
  };

  const handlePersonalCollectionPlayGame = (words: VocabularyItem[]) => {
    setPersonalCollectionWords(words);
    startGame(true);
  };

  // Show personal collection
  if (showPersonalCollection) {
    return (
      <PersonalCollection
        onBack={() => setShowPersonalCollection(false)}
        onPlayGame={handlePersonalCollectionPlayGame}
      />
    );
  }

  // Hiển thị camera practice modal
  if (showCameraPractice && questions[currentQuestion]) {
    return (
      <CameraPractice
        word={questions[currentQuestion].correctAnswer}
        onComplete={handleCameraPracticeComplete}
        onClose={() => setShowCameraPractice(false)}
      />
    );
  }

  if (!gameStarted) {
    return (
      <PracticeSetup
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        practiceMode={practiceMode}
        setPracticeMode={setPracticeMode}
        themes={themes}
        personalCollectionWords={personalCollectionWords}
        onStartGame={startGame}
        onShowPersonalCollection={() => setShowPersonalCollection(true)}
      />
    );
  }

  if (gameFinished) {
    return (
      <PracticeResults
        score={score}
        totalQuestions={questions.length}
        practiceMode={practiceMode}
        cameraScores={cameraScores}
        onStartGame={() => startGame(false)}
        onResetGame={resetGame}
      />
    );
  }

  const currentQ = questions[currentQuestion];

  // Camera practice question
  if (currentQ.type === 'camera-practice') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PracticeProgress
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            score={score}
          />
          <CameraPracticeQuestion
            question={currentQ}
            onStartCameraPractice={() => setShowCameraPractice(true)}
          />
        </div>
      </div>
    );
  }

  // Regular quiz question
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PracticeProgress
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}
          score={score}
        />
        <QuizQuestion
          question={currentQ}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          answered={answered[currentQuestion]}
          selectedTheme={selectedTheme}
          practiceMode={practiceMode}
          onSelectAnswer={selectAnswer}
          onCheckAnswer={checkAnswer}
          onNextQuestion={nextQuestion}
          isLastQuestion={currentQuestion >= questions.length - 1}
        />
      </div>
    </div>
  );
};

export default Practice;
