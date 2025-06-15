
import React from 'react';
import { RefreshCw, Trophy } from 'lucide-react';

interface PracticeResultsProps {
  score: number;
  totalQuestions: number;
  practiceMode: 'quiz' | 'camera';
  cameraScores: number[];
  onStartGame: () => void;
  onResetGame: () => void;
}

const PracticeResults: React.FC<PracticeResultsProps> = ({
  score,
  totalQuestions,
  practiceMode,
  cameraScores,
  onStartGame,
  onResetGame,
}) => {
  const getScoreMessage = () => {
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 90) return { message: "Xuất sắc! 🎉", color: "text-green-600" };
    if (percentage >= 70) return { message: "Tốt! 👏", color: "text-blue-600" };
    if (percentage >= 50) return { message: "Khá! 👍", color: "text-yellow-600" };
    return { message: "Cần cố gắng thêm! 💪", color: "text-red-600" };
  };

  const scoreInfo = getScoreMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-bounce-in">
          <Trophy className="w-20 h-20 text-education-orange mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Hoàn thành bài tập!
          </h1>
          
          <div className="text-6xl font-bold mb-4 gradient-text">
            {score}/{totalQuestions}
          </div>
          
          <p className={`text-xl font-semibold mb-6 ${scoreInfo.color}`}>
            {scoreInfo.message}
          </p>

          {/* Camera Practice Scores */}
          {practiceMode === 'camera' && cameraScores.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Điểm chi tiết:</h3>
              <div className="flex justify-center space-x-2">
                {cameraScores.map((cameraScore, index) => (
                  <div
                    key={index}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                      cameraScore >= 70 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {cameraScore}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-education-blue">{score}</div>
              <div className="text-sm text-gray-600">Đúng</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">{totalQuestions - score}</div>
              <div className="text-sm text-gray-600">Sai</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-education-green">{Math.round((score / totalQuestions) * 100)}%</div>
              <div className="text-sm text-gray-600">Tỷ lệ</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onStartGame}
              className="btn-primary"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Làm lại
            </button>
            <button
              onClick={onResetGame}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300"
            >
              Chọn chế độ khác
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeResults;
