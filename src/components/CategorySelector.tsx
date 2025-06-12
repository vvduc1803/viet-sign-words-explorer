
import React, { useState } from 'react';
import { BookOpen, Heart, Star, ArrowRight, ArrowLeft } from 'lucide-react';
import { getCategories, getSubcategories, getPersonalCollection } from '../data/vocabulary';

interface CategorySelectorProps {
  onSelectionComplete: (selection: {
    type: 'category' | 'subcategory' | 'personal';
    category?: string;
    subcategory?: string;
  }) => void;
  onBack?: () => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectionComplete, onBack }) => {
  const [step, setStep] = useState<'main' | 'category' | 'subcategory'>('main');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = getCategories();
  const personalCollection = getPersonalCollection();

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setStep('subcategory');
  };

  const handleSubcategorySelect = (subcategory: string) => {
    onSelectionComplete({
      type: 'subcategory',
      category: selectedCategory,
      subcategory
    });
  };

  const handlePersonalSelect = () => {
    onSelectionComplete({ type: 'personal' });
  };

  const handleBackToMain = () => {
    setStep('main');
    setSelectedCategory('');
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Động vật': return '🦁';
      case 'Thực phẩm': return '🍎';
      case 'Gia đình': return '👨‍👩‍👧‍👦';
      default: return '📚';
    }
  };

  const getSubcategoryIcon = (subcategory: string) => {
    switch (subcategory) {
      case 'Gia cầm': return '🐔';
      case 'Thú cưng': return '🐕';
      case 'Động vật hoang dã': return '🦁';
      case 'Trái cây': return '🍎';
      case 'Rau củ': return '🥕';
      case 'Cha mẹ': return '👨‍👩';
      case 'Anh chị em': return '👦👧';
      default: return '📝';
    }
  };

  if (step === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-4">
        <div className="max-w-4xl mx-auto">
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
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center flex-1">
              🎯 Chọn chủ đề học tập
            </h1>
            <div className="w-24"></div>
          </div>

          {/* Main Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Categories */}
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:animate-bounce">
                    {getCategoryIcon(category)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {category}
                  </h3>
                  <div className="flex items-center justify-center text-blue-600 font-medium">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>Khám phá</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}

            {/* Personal Collection */}
            <button
              onClick={handlePersonalSelect}
              disabled={personalCollection.length === 0}
              className="group bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:animate-pulse">
                  💖
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Bộ sưu tập của tôi
                </h3>
                <div className="flex items-center justify-center text-pink-100 font-medium">
                  <Heart className="w-4 h-4 mr-2" />
                  <span>{personalCollection.length} từ</span>
                  {personalCollection.length > 0 && (
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
              </div>
            </button>

            {/* All Words */}
            <button
              onClick={() => onSelectionComplete({ type: 'category' })}
              className="group bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-6xl mb-4 group-hover:animate-spin">
                  🌟
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Tất cả từ vựng
                </h3>
                <div className="flex items-center justify-center text-green-100 font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  <span>Học hết</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          </div>

          {/* Fun Tip */}
          <div className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-white mb-3">
                💡 Mẹo học tập
              </h2>
              <p className="text-white/90 text-lg">
                Hãy bắt đầu với chủ đề yêu thích nhất của bạn! 
                Bạn cũng có thể lưu các từ hay vào bộ sưu tập cá nhân để ôn tập sau này.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'subcategory') {
    const subcategories = getSubcategories(selectedCategory);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={handleBackToMain}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white hover:bg-white/30 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Quay lại</span>
            </button>
            
            <div className="text-center flex-1">
              <div className="text-4xl mb-2">{getCategoryIcon(selectedCategory)}</div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Chọn chủ đề con - {selectedCategory}
              </h1>
            </div>
            
            <div className="w-24"></div>
          </div>

          {/* Subcategory Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* All in Category */}
            <button
              onClick={() => onSelectionComplete({ type: 'category', category: selectedCategory })}
              className="group bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-5xl mb-4 group-hover:animate-pulse">
                  🎯
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Tất cả {selectedCategory}
                </h3>
                <div className="flex items-center justify-center text-blue-100 font-medium">
                  <Star className="w-4 h-4 mr-2" />
                  <span>Học hết</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>

            {/* Individual Subcategories */}
            {subcategories.map((subcategory) => (
              <button
                key={subcategory}
                onClick={() => handleSubcategorySelect(subcategory)}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="text-center">
                  <div className="text-5xl mb-4 group-hover:animate-bounce">
                    {getSubcategoryIcon(subcategory)}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {subcategory}
                  </h3>
                  <div className="flex items-center justify-center text-purple-600 font-medium">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>Học ngay</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CategorySelector;
