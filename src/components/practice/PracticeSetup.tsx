
import React from 'react';
import { ArrowLeft, Play, Brain, Camera, Users, Star, BookOpen } from 'lucide-react';
import { VocabularyItem } from '../../data/vocabulary';
import { HierarchicalCategory } from '../../data/hierarchicalVocabulary';

interface PracticeSetupProps {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  practiceMode: 'quiz' | 'camera';
  setPracticeMode: (mode: 'quiz' | 'camera') => void;
  themes: string[];
  personalCollectionWords: VocabularyItem[];
  onStartGame: () => void;
  onShowPersonalCollection: () => void;
  onBack?: () => void;
  selectedCategory?: HierarchicalCategory | null;
  categoryWords?: VocabularyItem[];
}

const PracticeSetup: React.FC<PracticeSetupProps> = ({
  selectedTheme,
  practiceMode,
  setPracticeMode,
  personalCollectionWords,
  onStartGame,
  onShowPersonalCollection,
  onBack,
  selectedCategory,
  categoryWords = []
}) => {
  const getCategoryIcon = (category?: HierarchicalCategory) => {
    return category?.icon || '📚';
  };

  const getBreadcrumbPath = (categoryId: string): string[] => {
    return categoryId.split('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white hover:bg-white/30 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Quay lại</span>
            </button>
          )}
          
          <div className="text-center flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              🎯 Cài đặt luyện tập
            </h1>
            {selectedCategory ? (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-md mx-auto">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-2xl mr-2">{getCategoryIcon(selectedCategory)}</span>
                  <h2 className="text-xl font-semibold text-white">{selectedCategory.name}</h2>
                </div>
                <div className="text-white/80 text-sm">
                  {getBreadcrumbPath(selectedCategory.id).join(' > ')}
                </div>
                <div className="text-white/90 text-lg font-medium mt-1">
                  {categoryWords.length} từ vựng có sẵn
                </div>
              </div>
            ) : (
              <p className="text-white/90 text-lg">
                Chọn chế độ luyện tập phù hợp với bạn
              </p>
            )}
          </div>
          
          <div className="w-24"></div>
        </div>

        {/* Practice Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={() => setPracticeMode('quiz')}
            className={`p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
              practiceMode === 'quiz'
                ? 'bg-white shadow-2xl text-gray-800'
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
            }`}
          >
            <div className="text-center">
              <Brain className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Quiz Trắc nghiệm</h3>
              <p className="text-sm opacity-80">
                Trả lời câu hỏi về hình ảnh và video ngôn ngữ ký hiệu
              </p>
              <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  10 câu hỏi
                </span>
                <span className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  Đa dạng
                </span>
              </div>
            </div>
          </button>

          <button
            onClick={() => setPracticeMode('camera')}
            className={`p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
              practiceMode === 'camera'
                ? 'bg-white shadow-2xl text-gray-800'
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
            }`}
          >
            <div className="text-center">
              <Camera className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Thực hành Camera</h3>
              <p className="text-sm opacity-80">
                Sử dụng camera để thực hiện ngôn ngữ ký hiệu
              </p>
              <div className="mt-4 flex items-center justify-center space-x-4 text-sm">
                <span className="flex items-center">
                  <Star className="w-4 h-4 mr-1" />
                  5 bài tập
                </span>
                <span className="flex items-center">
                  <Camera className="w-4 h-4 mr-1" />
                  Tương tác
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Start Game */}
          <button
            onClick={onStartGame}
            disabled={categoryWords.length === 0 && selectedCategory}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div className="text-center">
              <Play className="w-8 h-8 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Bắt đầu luyện tập</h3>
              <p className="text-sm opacity-90">
                {selectedCategory 
                  ? `Luyện tập với ${categoryWords.length} từ vựng`
                  : `Chế độ ${practiceMode === 'quiz' ? 'trắc nghiệm' : 'camera'}`
                }
              </p>
            </div>
          </button>

          {/* Personal Collection */}
          <button
            onClick={onShowPersonalCollection}
            disabled={personalCollectionWords.length === 0}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-3" />
              <h3 className="text-xl font-bold mb-2">Bộ sưu tập cá nhân</h3>
              <p className="text-sm opacity-90">
                {personalCollectionWords.length} từ đã lưu
              </p>
            </div>
          </button>
        </div>

        {/* Mode Description */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
          <h3 className="text-lg font-bold mb-3 flex items-center">
            {practiceMode === 'quiz' ? (
              <>
                <Brain className="w-5 h-5 mr-2" />
                Về chế độ Quiz Trắc nghiệm
              </>
            ) : (
              <>
                <Camera className="w-5 h-5 mr-2" />
                Về chế độ Thực hành Camera
              </>
            )}
          </h3>
          
          {practiceMode === 'quiz' ? (
            <div className="space-y-2 text-white/90">
              <p>• Các dạng câu hỏi: Hình ảnh → Ký hiệu, Video → Ký hiệu, Ký hiệu → Hình ảnh</p>
              <p>• Mỗi câu hỏi có 4 lựa chọn, chọn đáp án đúng nhất</p>
              <p>• Xem kết quả ngay sau khi trả lời</p>
              <p>• Thống kê điểm số và độ chính xác cuối bài</p>
            </div>
          ) : (
            <div className="space-y-2 text-white/90">
              <p>• Sử dụng camera để nhận diện cử chỉ tay của bạn</p>
              <p>• Thực hiện ngôn ngữ ký hiệu theo từ được yêu cầu</p>
              <p>• AI sẽ đánh giá độ chính xác của động tác</p>
              <p>• Điểm số từ 0-100, cần đạt ≥70 điểm để pass</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeSetup;
