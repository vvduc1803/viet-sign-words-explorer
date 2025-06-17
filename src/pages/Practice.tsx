import React, { useState, useEffect } from 'react';
import { themes, VocabularyItem, getPersonalCollection } from '../data/vocabulary';
import { HierarchicalCategory, hierarchicalCategories, getWordsFromCategory } from '../data/hierarchicalVocabulary';
import CameraPractice from '../components/CameraPractice';
import PersonalCollection from '../components/PersonalCollection';
import TreeCategorySelector from '../components/TreeCategorySelector';
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
  const [currentView, setCurrentView] = useState<'selector' | 'setup' | 'game'>('selector');
  const [selectedCategory, setSelectedCategory] = useState<HierarchicalCategory | null>(null);
  const [categoryWords, setCategoryWords] = useState<VocabularyItem[]>([]);

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

  const handleCategorySelection = (selection: {
    type: 'category' | 'personal' | 'all';
    categoryId?: string;
    categoryName?: string;
  }) => {
    if (selection.type === 'category' && selection.categoryId) {
      // Find the selected category
      const findCategory = (cats: HierarchicalCategory[], id: string): HierarchicalCategory | null => {
        for (const cat of cats) {
          if (cat.id === selection.categoryId) return cat;
          if (cat.children) {
            const found = findCategory(cat.children, id);
            if (found) return found;
          }
        }
        return null;
      };

      const category = findCategory(hierarchicalCategories, selection.categoryId);
      if (category) {
        setSelectedCategory(category);
        const words = getWordsFromCategory(hierarchicalCategories, selection.categoryId);
        setCategoryWords(words);
        setSelectedTheme(category.name);
        setCurrentView('setup');
      }
    } else if (selection.type === 'all') {
      setSelectedTheme('all');
      setCategoryWords([]);
      setCurrentView('setup');
    } else if (selection.type === 'personal') {
      setShowPersonalCollection(true);
      setCurrentView('selector');
    }
  };

  const startGame = (usePersonalCollection: boolean = false, useHierarchicalWords: boolean = false) => {
    let wordsToUse: VocabularyItem[];
    
    if (usePersonalCollection) {
      wordsToUse = personalCollectionWords;
    } else if (useHierarchicalWords && categoryWords.length > 0) {
      wordsToUse = categoryWords;
    } else {
      // Use legacy method
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
      setCurrentView('game');
      return;
    }

    // Generate questions from hierarchical words
    const newQuestions = generateQuestionsFromWords(wordsToUse, practiceMode);
    if (newQuestions.length === 0) {
      alert('Danh mục này chưa có từ nào để luyện tập!');
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
    setCurrentView('game');
  };

  const generateQuestionsFromWords = (words: VocabularyItem[], mode: 'quiz' | 'camera'): Question[] => {
    const generatedQuestions: Question[] = [];

    if (mode === 'camera') {
      const questionCount = Math.min(5, words.length);
      for (let i = 0; i < questionCount; i++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        generatedQuestions.push({
          id: `camera${i + 1}`,
          type: 'camera-practice',
          question: `Thực hiện ngôn ngữ ký hiệu cho từ: "${randomWord.word}"`,
          correctAnswer: randomWord,
          options: []
        });
      }
    } else {
      const questionTypes: Question['type'][] = [
        'image-to-sign',
        'video-to-sign', 
        'sign-to-image',
        'complete-sequence'
      ];

      const questionCount = Math.min(10, words.length);
      for (let i = 0; i < questionCount; i++) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        
        const wrongAnswers = words
          .filter(w => w.id !== randomWord.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.min(3, words.length - 1));

        const options = [randomWord, ...wrongAnswers].sort(() => Math.random() - 0.5);

        let questionText = '';
        let media = '';

        switch (questionType) {
          case 'image-to-sign':
            questionText = 'Chọn video ngôn ngữ ký hiệu phù hợp với hình ảnh:';
            media = randomWord.image;
            break;
          case 'video-to-sign':
            questionText = 'Chọn video ngôn ngữ ký hiệu phù hợp với video minh họa:';
            media = randomWord.video || randomWord.image;
            break;
          case 'sign-to-image':
            questionText = 'Chọn hình ảnh phù hợp với video ngôn ngữ ký hiệu:';
            media = randomWord.sign_language_video || randomWord.image;
            break;
          case 'complete-sequence':
            questionText = `Chọn từ thích hợp để hoàn thành câu: "Tôi thấy _____ trong vườn"`;
            break;
        }

        generatedQuestions.push({
          id: `q${i + 1}`,
          type: questionType,
          question: questionText,
          correctAnswer: randomWord,
          options,
          media
        });
      }
    }

    return generatedQuestions;
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
    setCurrentView('selector');
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

  // Show tree category selector
  if (currentView === 'selector') {
    return (
      <TreeCategorySelector
        onSelectionComplete={handleCategorySelection}
        mode="practice"
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

  // Show practice setup
  if (currentView === 'setup' && !gameStarted) {
    return (
      <PracticeSetup
        selectedTheme={selectedTheme}
        setSelectedTheme={setSelectedTheme}
        practiceMode={practiceMode}
        setPracticeMode={setPracticeMode}
        themes={themes}
        personalCollectionWords={personalCollectionWords}
        onStartGame={() => startGame(false, true)}
        onShowPersonalCollection={() => setShowPersonalCollection(true)}
        onBack={() => setCurrentView('selector')}
        selectedCategory={selectedCategory}
        categoryWords={categoryWords}
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
        onStartGame={() => startGame(false, categoryWords.length > 0)}
        onResetGame={resetGame}
      />
    );
  }

  const currentQ = questions[currentQuestion];

  // Camera practice question
  if (currentQ?.type === 'camera-practice') {
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
  if (currentQ) {
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
  }

  return null;
};

export default Practice;
