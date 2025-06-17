
import React from 'react';
import { Trophy, CheckCircle, Camera, Star } from 'lucide-react';
import { VocabularyItem } from '../../data/vocabulary';

interface PracticeSetupProps {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  practiceMode: 'quiz' | 'camera';
  setPracticeMode: (mode: 'quiz' | 'camera') => void;
  themes: string[];
  personalCollectionWords: VocabularyItem[];
  onStartGame: (usePersonalCollection: boolean) => void;
  onShowPersonalCollection: () => void;
}

const PracticeSetup: React.FC<PracticeSetupProps> = ({
  selectedTheme,
  setSelectedTheme,
  practiceMode,
  setPracticeMode,
  themes,
  personalCollectionWords,
  onStartGame,
  onShowPersonalCollection,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Bài tập Ôn tập
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Luyện tập nhận biết từ vựng và ngôn ngữ ký hiệu thông qua các câu hỏi trắc nghiệm hoặc thực hành với camera
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 text-education-orange mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Sẵn sàng thử thách?
            </h2>
            <p className="text-gray-600">
              Chọn chế độ luyện tập và chủ đề để bắt đầu
            </p>
          </div>

          {/* Personal Collection Option */}
          <div className="max-w-md mx-auto mb-6">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-xl text-white text-center">
              <h3 className="font-bold mb-2">Ôn tập Bộ sưu tập cá nhân</h3>
              <p className="text-sm mb-4 opacity-90">
                Ôn tập với {personalCollectionWords.length} từ đã lưu
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={onShowPersonalCollection}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                >
                  Xem bộ sưu tập
                </button>
                <button
                  onClick={() => onStartGame(true)}
                  disabled={personalCollectionWords.length === 0}
                  className="bg-white text-purple-600 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ôn tập ngay
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-md mx-auto space-y-6">
            {/* Practice Mode Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chế độ luyện tập
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPracticeMode('quiz')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    practiceMode === 'quiz' 
                      ? 'border-education-blue bg-blue-50 text-education-blue' 
                      : 'border-gray-200 hover:border-education-blue'
                  }`}
                >
                  <CheckCircle className="w-6 h-6 mb-2" />
                  <div className="font-medium">Trắc nghiệm</div>
                  <div className="text-sm opacity-75">10 câu hỏi</div>
                </button>
                <button
                  onClick={() => setPracticeMode('camera')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    practiceMode === 'camera' 
                      ? 'border-education-blue bg-blue-50 text-education-blue' 
                      : 'border-gray-200 hover:border-education-blue'
                  }`}
                >
                  <Camera className="w-6 h-6 mb-2" />
                  <div className="font-medium">Thực hành Camera</div>
                  <div className="text-sm opacity-75">5 bài tập</div>
                </button>
              </div>
            </div>

            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chọn chủ đề
              </label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="input-field"
              >
                <option value="all">Tất cả chủ đề</option>
                {themes.map(theme => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => onStartGame(false)}
              className="w-full btn-primary text-lg py-4"
            >
              Bắt đầu luyện tập
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <CheckCircle className="w-8 h-8 text-education-blue mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Trắc nghiệm</h3>
              <p className="text-sm text-gray-600">
                4 loại câu hỏi với hình ảnh và video
              </p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <Camera className="w-8 h-8 text-education-green mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Thực hành Camera</h3>
              <p className="text-sm text-gray-600">
                Nhận diện cử chỉ thực tế qua AI
              </p>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-xl">
              <Star className="w-8 h-8 text-education-purple mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Phản hồi tức thì</h3>
              <p className="text-sm text-gray-600">
                Chấm điểm và gợi ý cải thiện
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeSetup;
