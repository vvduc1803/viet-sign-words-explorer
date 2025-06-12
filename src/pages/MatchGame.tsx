
import React, { useState, useEffect } from 'react';
import { VocabularyItem, vocabularyData } from '../data/vocabulary';
import GameLayout from '../components/GameLayout';
import VideoPlayer from '../components/VideoPlayer';

const MatchGame = () => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState<VocabularyItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  const generateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * vocabularyData.length);
    const correctWord = vocabularyData[randomIndex];
    
    // Generate 3 wrong answers
    const wrongAnswers = vocabularyData
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

  const toggleMediaType = () => {
    setShowVideo(!showVideo);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <GameLayout title="Ghép từ với hình ảnh" score={score}>
      <div className="space-y-8">
        {/* Media Display */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <button
              onClick={toggleMediaType}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
            >
              {showVideo ? '📹 Xem hình ảnh' : '🎥 Xem video ký hiệu'}
            </button>
          </div>
          
          <div className="bg-gray-100 rounded-2xl p-4 max-w-md mx-auto">
            {currentWord && (
              showVideo ? (
                <VideoPlayer
                  src={currentWord.sign_language_video}
                  title={`Video ký hiệu: ${currentWord.word}`}
                  className="aspect-square"
                />
              ) : (
                <img
                  src={currentWord.image}
                  alt={currentWord.word}
                  className="w-full aspect-square object-cover rounded-xl"
                />
              )
            )}
          </div>
          
          <p className="text-lg font-medium text-gray-600 mt-4">
            {showVideo ? 'Từ nào phù hợp với video ký hiệu này?' : 'Từ nào phù hợp với hình ảnh này?'}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              disabled={showFeedback !== null}
              className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white p-6 rounded-2xl text-xl font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`text-center p-6 rounded-2xl ${
            isCorrect 
              ? 'bg-green-100 text-green-800 animate-bounce' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            <div className="text-3xl font-bold mb-2">{showFeedback}</div>
            {isCorrect && (
              <div className="text-6xl animate-pulse">🎊✨🎉</div>
            )}
            {!isCorrect && currentWord && (
              <div className="mt-4">
                <p className="text-lg">Đáp án đúng là: <strong>{currentWord.word}</strong></p>
                <button
                  onClick={generateQuestion}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
                >
                  Câu tiếp theo
                </button>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-blue-800 font-medium">
            💡 Mẹo: Quan sát kỹ video ký hiệu hoặc hình ảnh, sau đó chọn từ phù hợp nhất!
          </p>
        </div>
      </div>
    </GameLayout>
  );
};

export default MatchGame;
