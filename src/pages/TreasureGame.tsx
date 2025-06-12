
import React, { useState, useEffect } from 'react';
import { Heart, Settings } from 'lucide-react';
import { VocabularyItem, getAllWords, getWordsByCategory, getWordsBySubcategory, getPersonalCollection, addToPersonalCollection, isInPersonalCollection } from '../data/vocabulary';
import GameLayout from '../components/GameLayout';
import VideoPlayer from '../components/VideoPlayer';
import CategorySelector from '../components/CategorySelector';

interface MapPoint {
  id: string;
  x: number;
  y: number;
  word: VocabularyItem;
  unlocked: boolean;
  completed: boolean;
}

const TreasureGame = () => {
  const [gameState, setGameState] = useState<'setup' | 'playing'>('setup');
  const [score, setScore] = useState(0);
  const [mapPoints, setMapPoints] = useState<MapPoint[]>([]);
  const [currentPoint, setCurrentPoint] = useState<MapPoint | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [characterPosition, setCharacterPosition] = useState({ x: 10, y: 90 });
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
    setGameCompleted(false);
  };

  const initializeMap = () => {
    if (availableWords.length === 0) return;
    
    const selectedWords = availableWords.sort(() => Math.random() - 0.5).slice(0, Math.min(6, availableWords.length));
    
    const points: MapPoint[] = selectedWords.map((word, index) => ({
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
    
    // Generate options from available words
    const wrongAnswers = availableWords
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

  const handleAddToCollection = () => {
    if (currentPoint && !isInPersonalCollection(currentPoint.word.id)) {
      addToPersonalCollection(currentPoint.word.id);
      const originalFeedback = showFeedback;
      setShowFeedback('Đã thêm vào bộ sưu tập! 💝');
      setTimeout(() => {
        setShowFeedback(originalFeedback);
      }, 1500);
    }
  };

  const resetGame = () => {
    if (gameState === 'playing') {
      setGameState('setup');
      setScore(0);
      setCurrentPoint(null);
      setGameConfig(null);
      setAvailableWords([]);
      setMapPoints([]);
      setGameCompleted(false);
    } else {
      setScore(0);
      setGameCompleted(false);
      setCurrentPoint(null);
      initializeMap();
    }
  };

  useEffect(() => {
    if (gameState === 'playing' && availableWords.length > 0) {
      initializeMap();
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
    <GameLayout title="Tìm kho báu từ vựng" score={score}>
      <div className="space-y-6">
        {/* Game Completed */}
        {gameCompleted && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 text-center max-w-md mx-4">
              <div className="text-8xl mb-6 animate-bounce">🏆💎✨</div>
              <h2 className="text-4xl font-bold text-yellow-600 mb-4">
                Chúc mừng!
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Bạn đã tìm thấy tất cả kho báu từ vựng!
              </p>
              <div className="text-3xl font-bold text-green-600 mb-6">
                Tổng điểm: {score} 🌟
              </div>
              <div className="space-y-3">
                <button
                  onClick={resetGame}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300"
                >
                  Chơi lại
                </button>
                <button
                  onClick={() => setGameState('setup')}
                  className="w-full bg-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 transition-all duration-300"
                >
                  Đổi chủ đề
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Game Controls */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setGameState('setup')}
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
          
          {currentPoint && !isInPersonalCollection(currentPoint.word.id) && (
            <button
              onClick={handleAddToCollection}
              className="flex items-center space-x-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl font-medium transition-all duration-300"
            >
              <Heart className="w-4 h-4" />
              <span>Lưu từ</span>
            </button>
          )}
        </div>

        {/* Map */}
        <div className="bg-gradient-to-br from-green-200 via-blue-200 to-purple-200 rounded-2xl p-6 relative overflow-hidden min-h-[450px] border-4 border-white shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-4 text-gray-800 bg-white/70 rounded-xl p-3">
            🗺️ Bản đồ kho báu từ vựng
          </h3>
          
          {/* Character */}
          <div 
            className="absolute w-12 h-12 transition-all duration-1000 ease-in-out z-10"
            style={{ 
              left: `${characterPosition.x}%`, 
              top: `${characterPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="text-3xl animate-bounce">🧙‍♂️</div>
          </div>
          
          {/* Map Points */}
          {mapPoints.map((point, index) => (
            <button
              key={point.id}
              onClick={() => handlePointClick(point)}
              disabled={!point.unlocked || point.completed}
              className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all duration-300 transform hover:scale-110 border-4 ${
                point.completed 
                  ? 'bg-yellow-400 border-yellow-600 text-yellow-800 animate-pulse' 
                  : point.unlocked 
                    ? 'bg-red-400 border-red-600 text-white hover:bg-red-500 cursor-pointer shadow-lg' 
                    : 'bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed'
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
          <div className="absolute top-4 right-4 text-5xl opacity-50">🏔️</div>
          <div className="absolute bottom-4 left-4 text-4xl opacity-50">🌳</div>
          <div className="absolute top-1/2 right-8 text-3xl opacity-50 animate-float">🦋</div>
          <div className="absolute bottom-8 right-12 text-3xl opacity-50">🌸</div>
        </div>

        {/* Current Challenge */}
        {currentPoint && !showFeedback && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-center text-gray-800 bg-yellow-100 rounded-xl p-4">
              🎁 Kho báu đã tìm thấy! Trả lời đúng để mở khóa:
            </h3>
            
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 max-w-md mx-auto shadow-lg">
              <VideoPlayer
                src={currentPoint.word.sign_language_video}
                title={`Video ký hiệu: ${currentPoint.word.word}`}
                className="aspect-square rounded-xl"
              />
            </div>
            
            <p className="text-center text-xl font-bold text-gray-700 bg-blue-100 rounded-xl p-3">
              🤔 Video ký hiệu này biểu diễn từ nào?
            </p>
            
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white p-6 rounded-xl text-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg transform active:scale-95"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className={`text-center p-8 rounded-2xl mx-auto max-w-md ${
            isCorrect 
              ? 'bg-green-100 text-green-800 border-2 border-green-300' 
              : 'bg-orange-100 text-orange-800 border-2 border-orange-300'
          }`}>
            <div className="text-3xl font-bold mb-4">{showFeedback}</div>
            {isCorrect && (
              <div className="text-5xl animate-spin">💎✨🎊</div>
            )}
            {!isCorrect && (
              <button
                onClick={() => setShowFeedback(null)}
                className="mt-4 bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium"
              >
                Thử lại
              </button>
            )}
          </div>
        )}

        {/* Progress */}
        <div className="bg-blue-50 rounded-xl p-6 text-center border-2 border-blue-200">
          <p className="text-blue-800 font-bold text-lg mb-3">
            📍 Tiến độ: {mapPoints.filter(p => p.completed).length}/{mapPoints.length} kho báu
          </p>
          <div className="w-full bg-blue-200 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${mapPoints.length > 0 ? (mapPoints.filter(p => p.completed).length / mapPoints.length) * 100 : 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </GameLayout>
  );
};

export default TreasureGame;
