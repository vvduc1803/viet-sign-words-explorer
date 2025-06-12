
import React, { useState, useEffect } from 'react';
import { VocabularyItem, vocabularyData } from '../data/vocabulary';
import GameLayout from '../components/GameLayout';
import VideoPlayer from '../components/VideoPlayer';

interface MapPoint {
  id: string;
  x: number;
  y: number;
  word: VocabularyItem;
  unlocked: boolean;
  completed: boolean;
}

const TreasureGame = () => {
  const [score, setScore] = useState(0);
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const [currentPoint, setCurrentPoint] = useState<MapPoint | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [characterPosition, setCharacterPosition] = useState({ x: 10, y: 90 });

  const initializeMap = () => {
    const shuffledWords = vocabularyData.sort(() => Math.random() - 0.5).slice(0, 6);
    
    const points: MapPoint[] = shuffledWords.map((word, index) => ({
      id: word.id,
      x: 15 + (index % 3) * 35 + Math.random() * 10,
      y: 20 + Math.floor(index / 3) * 40 + Math.random() * 10,
      word,
      unlocked: index === 0, // First point is unlocked
      completed: false
    }));

    setMapPoints(points);
    
    // Set character position near first point
    if (points.length > 0) {
      setCharacterPosition({ x: points[0].x - 5, y: points[0].y + 10 });
    }
  };

  const handlePointClick = (point: MapPoint) => {
    if (!point.unlocked || point.completed) return;
    
    setCurrentPoint(point);
    
    // Generate options
    const wrongAnswers = vocabularyData
      .filter(item => item.id !== point.word.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(item => item.word);
    
    const allOptions = [point.word.word, ...wrongAnswers].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
    setShowFeedback(null);
    setIsCorrect(false);
  };

  const handleAnswer = (selectedWord: string) => {
    if (!currentPoint) return;
    
    if (selectedWord === currentPoint.word.word) {
      setIsCorrect(true);
      setScore(prev => prev + 10);
      setShowFeedback('Chính xác! Kho báu đã được mở khóa! 🎉');
      
      // Update map points
      setMapPoints(prev => {
        const updated = prev.map(point => 
          point.id === currentPoint.id 
            ? { ...point, completed: true }
            : point
        );
        
        // Unlock next point
        const currentIndex = updated.findIndex(p => p.id === currentPoint.id);
        if (currentIndex < updated.length - 1) {
          updated[currentIndex + 1].unlocked = true;
          
          // Move character to next point
          setTimeout(() => {
            setCharacterPosition({ 
              x: updated[currentIndex + 1].x - 5, 
              y: updated[currentIndex + 1].y + 10 
            });
          }, 1000);
        }
        
        return updated;
      });
      
      // Check if game completed
      const completedCount = mapPoints.filter(p => p.completed).length;
      if (completedCount + 1 >= mapPoints.length) {
        setTimeout(() => {
          setGameCompleted(true);
        }, 2000);
      }
      
      setTimeout(() => {
        setCurrentPoint(null);
      }, 2000);
    } else {
      setIsCorrect(false);
      setShowFeedback('Thử lại! Hãy xem kỹ hơn nhé! 💪');
    }
  };

  const resetGame = () => {
    setScore(0);
    setGameCompleted(false);
    setCurrentPoint(null);
    initializeMap();
  };

  useEffect(() => {
    initializeMap();
  }, []);

  return (
    <GameLayout title="Tìm kho báu từ vựng" score={score}>
      <div className="space-y-6">
        {/* Game Completed */}
        {gameCompleted && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
              <div className="text-6xl mb-4">🏆💎✨</div>
              <h2 className="text-3xl font-bold text-yellow-600 mb-4">
                Chúc mừng!
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Bạn đã tìm thấy tất cả kho báu từ vựng!
              </p>
              <div className="text-2xl font-bold text-green-600 mb-6">
                Tổng điểm: {score} 🌟
              </div>
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300"
              >
                Chơi lại
              </button>
            </div>
          </div>
        )}

        {/* Map */}
        <div className="bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 rounded-2xl p-4 relative overflow-hidden min-h-[400px]">
          <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
            🗺️ Bản đồ kho báu từ vựng
          </h3>
          
          {/* Character */}
          <div 
            className="absolute w-8 h-8 transition-all duration-1000 ease-in-out z-10"
            style={{ 
              left: `${characterPosition.x}%`, 
              top: `${characterPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="text-2xl animate-bounce">🧙‍♂️</div>
          </div>
          
          {/* Map Points */}
          {mapPoints.map((point, index) => (
            <button
              key={point.id}
              onClick={() => handlePointClick(point)}
              disabled={!point.unlocked || point.completed}
              className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300 transform hover:scale-110 ${
                point.completed 
                  ? 'bg-yellow-400 text-yellow-800 animate-pulse' 
                  : point.unlocked 
                    ? 'bg-red-400 text-white hover:bg-red-500 cursor-pointer' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              style={{ 
                left: `${point.x}%`, 
                top: `${point.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {point.completed ? '💎' : point.unlocked ? '🎁' : '🔒'}
            </button>
          ))}
          
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-4xl opacity-50">🏔️</div>
          <div className="absolute bottom-4 left-4 text-3xl opacity-50">🌳</div>
          <div className="absolute top-1/2 right-8 text-2xl opacity-50">🦋</div>
        </div>

        {/* Current Challenge */}
        {currentPoint && !showFeedback && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-center text-gray-800">
              🎁 Kho báu đã tìm thấy! Trả lời đúng để mở khóa:
            </h3>
            
            <div className="bg-gray-100 rounded-2xl p-4 max-w-md mx-auto">
              <VideoPlayer
                src={currentPoint.word.sign_language_video}
                title={`Video ký hiệu: ${currentPoint.word.word}`}
                className="aspect-square"
              />
            </div>
            
            <p className="text-center text-lg font-medium text-gray-600">
              Video ký hiệu này biểu diễn từ nào?
            </p>
            
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white p-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className={`text-center p-6 rounded-2xl ${
            isCorrect 
              ? 'bg-green-100 text-green-800' 
              : 'bg-orange-100 text-orange-800'
          }`}>
            <div className="text-2xl font-bold mb-2">{showFeedback}</div>
            {isCorrect && (
              <div className="text-4xl animate-spin">💎✨🎊</div>
            )}
            {!isCorrect && (
              <button
                onClick={() => setShowFeedback(null)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors"
              >
                Thử lại
              </button>
            )}
          </div>
        )}

        {/* Progress */}
        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <p className="text-blue-800 font-medium">
            📍 Tiến độ: {mapPoints.filter(p => p.completed).length}/{mapPoints.length} kho báu
          </p>
          <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(mapPoints.filter(p => p.completed).length / mapPoints.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default TreasureGame;
