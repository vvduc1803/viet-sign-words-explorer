
import React, { useState, useEffect } from 'react';
import { Heart, Settings } from 'lucide-react';
import { VocabularyItem, getAllWords, getWordsByCategory, getWordsBySubcategory, getPersonalCollection, addToPersonalCollection, isInPersonalCollection } from '../data/vocabulary';
import GameLayout from '../components/GameLayout';
import VideoPlayer from '../components/VideoPlayer';
import CategorySelector from '../components/CategorySelector';

const MatchGame = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing'>('setup');
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState<VocabularyItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const [availableWords, setAvailableWords] = useState<VocabularyItem[]>([]);
  const [gameConfig, setGameConfig] = useState<{
    type: 'category' | 'subcategory' | 'personal';
    category?: string;
    subcategory?: string;
  } | null>(null);

  const handleCategorySelection = (selection: {
    type: 'category' | 'subcategory' | 'personal';
    category?: string;
    subcategory?: string;
  }) => {
    setGameConfig(selection);
    
    let words: VocabularyItem[] = [];
    
    if (selection.type === 'personal') {
      words = getPersonalCollection();
    } else if (selection.type === 'category' && selection.category) {
      words = getWordsByCategory(selection.category);
    } else if (selection.type === 'subcategory' && selection.category && selection.subcategory) {
      words = getWordsBySubcategory(selection.category, selection.subcategory);
    } else {
      words = getAllWords();
    }
    
    if (words.length < 4) {
      alert('Cần ít nhất 4 từ để chơi game. Vui lòng chọn chủ đề khác hoặc thêm từ vào bộ sưu tập.');
      return;
    }
    
    setAvailableWords(words);
    setGameState('playing');
    setScore(0);
  };

  const generateQuestion = () => {
    if (availableWords.length < 4) return;
    
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const correctWord = availableWords[randomIndex];
    
    // Generate 3 wrong answers from available words
    const wrongAnswers = availableWords
      .filter(item => item.id !== correctWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(item => item.word);
    
    // Mix all options and shuffle
    const allOptions = [correctWord.word, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    setCurrentWord(correctWord);
    setOptions(allOptions);
    setShowFeedback(null);
    setIsCorrect(false);
  };

  const handleAnswer = (selectedWord: string) => {
    if (selectedWord === currentWord?.word) {
      setIsCorrect(true);
      setScore(prev => prev + 10);
      setShowFeedback('Chính xác! 🎉');
      
      // Play success sound effect (mock)
      console.log('🔊 Success sound!');
      
      setTimeout(() => {
        generateQuestion();
      }, 2000);
    } else {
      setIsCorrect(false);
      setShowFeedback('Thử lại! 💪');
    }
  };

  const handleAddToCollection = () => {
    if (currentWord && !isInPersonalCollection(currentWord.id)) {
      addToPersonalCollection(currentWord.id);
      // Show a brief confirmation
      const originalFeedback = showFeedback;
      setShowFeedback('Đã thêm vào bộ sưu tập! 💝');
      setTimeout(() => {
        setShowFeedback(originalFeedback);
      }, 1500);
    }
  };

  const toggleMediaType = () => {
    setShowVideo(!showVideo);
  };

  const resetGame = () => {
    setGameState('setup');
    setScore(0);
    setCurrentWord(null);
    setGameConfig(null);
    setAvailableWords([]);
  };

  useEffect(() => {
    if (gameState === 'playing' && availableWords.length > 0) {
      generateQuestion();
    }
  }, [gameState, availableWords]);

  if (gameState === 'setup') {
    return (
      <CategorySelector
        onSelectionComplete={handleCategorySelection}
        onBack={() => window.history.back()}
      />
    );
  }

  return (
    <GameLayout title="Ghép từ với hình ảnh" score={score}>
      <div className="space-y-8">
        {/* Game Controls */}
        <div className="flex justify-between items-center">
          <button
            onClick={resetGame}
            className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300"
          >
            <Settings className="w-4 h-4" />
            <span>Đổi chủ đề</span>
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              {gameConfig?.type === 'personal' ? 'Bộ sưu tập cá nhân' :
               gameConfig?.subcategory ? `${gameConfig.category} - ${gameConfig.subcategory}` :
               gameConfig?.category ? gameConfig.category : 'Tất cả từ vựng'}
            </p>
          </div>
          
          {currentWord && !isInPersonalCollection(currentWord.id) && (
            <button
              onClick={handleAddToCollection}
              className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300"
            >
              <Heart className="w-4 h-4" />
              <span>Lưu từ</span>
            </button>
          )}
        </div>

        {/* Media Display */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <button
              onClick={toggleMediaType}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 text-lg"
            >
              {showVideo ? '📸 Xem hình ảnh' : '🎥 Xem video ký hiệu'}
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 max-w-md mx-auto shadow-lg">
            {currentWord && (
              showVideo ? (
                <VideoPlayer
                  src={currentWord.sign_language_video}
                  title={`Video ký hiệu: ${currentWord.word}`}
                  className="aspect-square rounded-xl"
                />
              ) : (
                <img
                  src={currentWord.image}
                  alt={currentWord.word}
                  className="w-full aspect-square object-cover rounded-xl shadow-md"
                />
              )
            )}
          </div>
          
          <p className="text-xl font-bold text-gray-700 mt-6 bg-yellow-100 rounded-xl p-3 max-w-lg mx-auto">
            {showVideo ? '🤔 Từ nào phù hợp với video ký hiệu này?' : '🤔 Từ nào phù hợp với hình ảnh này?'}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback !== null}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white p-6 rounded-2xl text-xl font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transform active:scale-95"
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`text-center p-8 rounded-2xl mx-auto max-w-md ${
            isCorrect 
              ? 'bg-green-100 text-green-800 animate-bounce' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            <div className="text-4xl font-bold mb-4">{showFeedback}</div>
            {isCorrect && (
              <div className="text-6xl animate-pulse">🎊✨🎉</div>
            )}
            {!isCorrect && currentWord && (
              <div className="mt-4">
                <p className="text-lg mb-4">Đáp án đúng là: <strong>{currentWord.word}</strong></p>
                {currentWord.description && (
                  <p className="text-sm bg-white/50 p-3 rounded-lg mb-4">
                    💡 {currentWord.description}
                  </p>
                )}
                <button
                  onClick={generateQuestion}
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium"
                >
                  Câu tiếp theo
                </button>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-6 text-center border-2 border-blue-200">
          <p className="text-blue-800 font-medium text-lg">
            💡 <strong>Mẹo:</strong> Quan sát kỹ video ký hiệu hoặc hình ảnh, sau đó chọn từ phù hợp nhất! 
            Đừng quên lưu những từ hay vào bộ sưu tập nhé! 💖
          </p>
        </div>
      </div>
    </GameLayout>
  );
};

export default MatchGame;
