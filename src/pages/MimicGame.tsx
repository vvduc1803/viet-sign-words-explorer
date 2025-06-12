
import React, { useState, useEffect } from 'react';
import { VocabularyItem, vocabularyData } from '../data/vocabulary';
import GameLayout from '../components/GameLayout';
import VideoPlayer from '../components/VideoPlayer';

const MimicGame = () => {
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState<VocabularyItem | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [gamePhase, setGamePhase] = useState<'watching' | 'mimicking' | 'answering' | 'feedback'>('watching');
  const [countdown, setCountdown] = useState(10);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

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

  useEffect(() => {
    generateQuestion();
  }, []);

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

  return (
    <GameLayout title="Bắt chước ký hiệu" score={score}>
      <div className="space-y-8">
        {/* Game Phase Indicator */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold text-lg">
            {gamePhase === 'watching' && '👀 Giai đoạn: Xem video'}
            {gamePhase === 'mimicking' && `🤲 Giai đoạn: Bắt chước (${countdown}s)`}
            {gamePhase === 'answering' && '🤔 Giai đoạn: Trả lời'}
            {gamePhase === 'feedback' && '📝 Kết quả'}
          </div>
        </div>

        {/* Watching Phase */}
        {gamePhase === 'watching' && currentWord && (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Hãy xem kỹ video ký hiệu này! 👁️
            </h2>
            
            <div className="bg-gray-100 rounded-2xl p-4 max-w-md mx-auto">
              <VideoPlayer
                src={currentWord.sign_language_video}
                title={`Video ký hiệu: ${currentWord.word}`}
                className="aspect-square"
              />
            </div>
            
            <button
              onClick={startMimicking}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🤲 Bắt đầu bắt chước!
            </button>

            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-blue-800 font-medium">
                💡 Hướng dẫn: Xem kỹ từng động tác của video, sau đó bạn sẽ có 10 giây để bắt chước!
              </p>
            </div>
          </div>
        )}

        {/* Mimicking Phase */}
        {gamePhase === 'mimicking' && (
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-green-600">
              Hãy bắt chước ký hiệu! 🤲
            </h2>
            
            <div className="text-6xl font-bold text-red-500 animate-pulse">
              {countdown}
            </div>
            
            <div className="bg-green-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">🤲✨</div>
              <p className="text-green-800 text-xl font-medium">
                Bắt chước theo video bạn vừa xem!
              </p>
              <p className="text-green-600 mt-2">
                Sử dụng tay, nét mặt và cả toàn thân nếu cần!
              </p>
            </div>

            <button
              onClick={startAnswering}
              className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors"
            >
              Bỏ qua và trả lời luôn
            </button>
          </div>
        )}

        {/* Answering Phase */}
        {gamePhase === 'answering' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Ký hiệu bạn vừa bắt chước là từ nào? 🤔
            </h2>
            
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white p-6 rounded-2xl text-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {option}
                </button>
              ))}
            </div>

            {currentWord && (
              <div className="text-center">
                <button
                  onClick={() => setGamePhase('watching')}
                  className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors"
                >
                  🔄 Xem lại video
                </button>
              </div>
            )}
          </div>
        )}

        {/* Feedback Phase */}
        {gamePhase === 'feedback' && showFeedback && (
          <div className={`text-center p-6 rounded-2xl ${
            isCorrect 
              ? 'bg-green-100 text-green-800' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            <div className="text-3xl font-bold mb-2">{showFeedback}</div>
            {isCorrect && (
              <div className="text-6xl animate-bounce">🎊👏🎉</div>
            )}
            {!isCorrect && currentWord && (
              <div className="mt-4 space-y-4">
                <p className="text-lg">Đáp án đúng là: <strong>{currentWord.word}</strong></p>
                <div className="bg-white rounded-xl p-4">
                  <p className="text-gray-600 mb-2">Xem lại hình ảnh minh họa:</p>
                  <img
                    src={currentWord.image}
                    alt={currentWord.word}
                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                  />
                </div>
                <button
                  onClick={generateQuestion}
                  className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors"
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
