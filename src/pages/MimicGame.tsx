
import React, { useState, useEffect } from 'react';
import { Heart, Settings } from 'lucide-react';
import { VocabularyItem, getAllWords, getWordsByCategory, getWordsBySubcategory, getPersonalCollection, addToPersonalCollection, isInPersonalCollection } from '../data/vocabulary';
import GameLayout from '../components/GameLayout';
import VideoPlayer from '../components/VideoPlayer';
import CategorySelector from '../components/CategorySelector';

const MimicGame = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing'>('setup');
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState<VocabularyItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [gamePhase, setGamePhase] = useState<'watching' | 'mimicking' | 'answering' | 'feedback'>('watching');
  const [countdown, setCountdown] = useState(10);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
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
    setGamePhase('watching');
    setShowFeedback(null);
    setIsCorrect(false);
    setCountdown(10);
  };

  const startMimicking = () => {
    setGamePhase('mimicking');
    setCountdown(10);
  };

  const startAnswering = () => {
    setGamePhase('answering');
  };

  const handleAnswer = (selectedWord: string) => {
    if (selectedWord === currentWord?.word) {
      setIsCorrect(true);
      setScore(prev => prev + 10);
      setShowFeedback('Tuyệt vời! Bạn đã bắt chước và trả lời đúng! 🎉');
      
      setTimeout(() => {
        generateQuestion();
      }, 3000);
    } else {
      setIsCorrect(false);
      setShowFeedback('Hãy thử lại! Xem lại video để hiểu rõ hơn nhé! 💪');
    }
    setGamePhase('feedback');
  };

  const handleAddToCollection = () => {
    if (currentWord && !isInPersonalCollection(currentWord.id)) {
      addToPersonalCollection(currentWord.id);
      const originalFeedback = showFeedback;
      setShowFeedback('Đã thêm vào bộ sưu tập! 💝');
      setTimeout(() => {
        setShowFeedback(originalFeedback);
      }, 1500);
    }
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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gamePhase === 'mimicking' && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (gamePhase === 'mimicking' && countdown === 0) {
      startAnswering();
    }

    return () => clearTimeout(timer);
  }, [gamePhase, countdown]);

  if (gameState === 'setup') {
    return (
      <CategorySelector
        onSelectionComplete={handleCategorySelection}
        onBack={() => window.history.back()}
      />
    );
  }

  return (
    <GameLayout title="Bắt chước ký hiệu" score={score}>
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

        {/* Game Phase Indicator */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-lg">
            {gamePhase === 'watching' && '👀 Giai đoạn: Xem video'}
            {gamePhase === 'mimicking' && `🤲 Giai đoạn: Bắt chước (${countdown}s)`}
            {gamePhase === 'answering' && '🤔 Giai đoạn: Trả lời'}
            {gamePhase === 'feedback' && '📝 Kết quả'}
          </div>
        </div>

        {/* Watching Phase */}
        {gamePhase === 'watching' && currentWord && (
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 bg-blue-100 rounded-xl p-4">
              👁️ Hãy xem kỹ video ký hiệu này!
            </h2>
            
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 max-w-md mx-auto shadow-lg">
              <VideoPlayer
                src={currentWord.sign_language_video}
                title={`Video ký hiệu: ${currentWord.word}`}
                className="aspect-square rounded-xl"
              />
            </div>
            
            <button
              onClick={startMimicking}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-10 py-5 rounded-2xl text-2xl font-bold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🤲 Bắt đầu bắt chước!
            </button>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200 max-w-2xl mx-auto">
              <p className="text-blue-800 font-medium text-lg">
                💡 <strong>Hướng dẫn:</strong> Xem kỹ từng động tác của video, chú ý đến tay, nét mặt và vị trí cơ thể. 
                Sau đó bạn sẽ có 10 giây để bắt chước!
              </p>
            </div>
          </div>
        )}

        {/* Mimicking Phase */}
        {gamePhase === 'mimicking' && (
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-green-600 bg-green-100 rounded-xl p-6">
              🤲 Hãy bắt chước ký hiệu!
            </h2>
            
            <div className="text-8xl font-bold text-red-500 animate-pulse bg-red-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto">
              {countdown}
            </div>
            
            <div className="bg-green-100 rounded-2xl p-8 border-2 border-green-300 max-w-lg mx-auto">
              <div className="text-6xl mb-6">🤲✨🎭</div>
              <p className="text-green-800 text-2xl font-bold mb-4">
                Bắt chước theo video bạn vừa xem!
              </p>
              <p className="text-green-700 text-lg">
                🙌 Sử dụng tay, nét mặt và cả toàn thân nếu cần!<br/>
                😊 Đừng ngại biểu hiện cảm xúc nhé!
              </p>
            </div>

            <button
              onClick={startAnswering}
              className="bg-orange-500 text-white px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors text-lg font-medium"
            >
              ⏩ Bỏ qua và trả lời luôn
            </button>
          </div>
        )}

        {/* Answering Phase */}
        {gamePhase === 'answering' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center bg-yellow-100 rounded-xl p-4">
              🤔 Ký hiệu bạn vừa bắt chước là từ nào?
            </h2>
            
            <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white p-6 rounded-2xl text-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg transform active:scale-95"
                >
                  {option}
                </button>
              ))}
            </div>

            {currentWord && (
              <div className="text-center">
                <button
                  onClick={() => setGamePhase('watching')}
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-colors font-medium"
                >
                  🔄 Xem lại video
                </button>
              </div>
            )}
          </div>
        )}

        {/* Feedback Phase */}
        {gamePhase === 'feedback' && showFeedback && (
          <div className={`text-center p-8 rounded-2xl mx-auto max-w-md ${
            isCorrect 
              ? 'bg-green-100 text-green-800 border-2 border-green-300' 
              : 'bg-orange-100 text-orange-800 border-2 border-orange-300'
          }`}>
            <div className="text-4xl font-bold mb-4">{showFeedback}</div>
            {isCorrect && (
              <div className="text-6xl animate-bounce">🎊👏🎉</div>
            )}
            {!isCorrect && currentWord && (
              <div className="mt-6 space-y-4">
                <p className="text-xl">Đáp án đúng là: <strong>{currentWord.word}</strong></p>
                {currentWord.description && (
                  <p className="text-sm bg-white/50 p-3 rounded-lg">
                    💡 {currentWord.description}
                  </p>
                )}
                <div className="bg-white rounded-xl p-4">
                  <p className="text-gray-600 mb-3 font-medium">Xem lại hình ảnh minh họa:</p>
                  <img
                    src={currentWord.image}
                    alt={currentWord.word}
                    className="w-40 h-40 object-cover rounded-lg mx-auto shadow-md"
                  />
                </div>
                <button
                  onClick={generateQuestion}
                  className="bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors font-medium text-lg"
                >
                  Từ tiếp theo
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </GameLayout>
  );
};

export default MimicGame;
