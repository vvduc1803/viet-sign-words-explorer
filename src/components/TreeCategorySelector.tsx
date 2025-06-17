
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, BookOpen, ArrowLeft, Search } from 'lucide-react';
import { HierarchicalCategory, hierarchicalCategories, getWordsFromCategory } from '../data/hierarchicalVocabulary';
import { getPersonalCollection } from '../data/vocabulary';

interface TreeCategorySelectorProps {
  onSelectionComplete: (selection: {
    type: 'category' | 'personal' | 'all';
    categoryId?: string;
    categoryName?: string;
  }) => void;
  onBack?: () => void;
  mode?: 'practice' | 'dictionary';
}

const TreeCategorySelector: React.FC<TreeCategorySelectorProps> = ({ 
  onSelectionComplete, 
  onBack,
  mode = 'dictionary'
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const personalCollection = getPersonalCollection();

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategorySelect = (category: HierarchicalCategory) => {
    onSelectionComplete({
      type: 'category',
      categoryId: category.id,
      categoryName: category.name
    });
  };

  const filterCategories = (categories: HierarchicalCategory[], query: string): HierarchicalCategory[] => {
    if (!query.trim()) return categories;
    
    return categories.filter(category => {
      const matchesName = category.name.toLowerCase().includes(query.toLowerCase());
      const hasMatchingChildren = category.children && 
        filterCategories(category.children, query).length > 0;
      const hasMatchingWords = category.words && 
        category.words.some(word => word.word.toLowerCase().includes(query.toLowerCase()));
      
      return matchesName || hasMatchingChildren || hasMatchingWords;
    }).map(category => ({
      ...category,
      children: category.children ? filterCategories(category.children, query) : undefined
    }));
  };

  const renderCategoryTree = (categories: HierarchicalCategory[], level: number = 0) => {
    const filteredCategories = filterCategories(categories, searchQuery);

    return filteredCategories.map(category => {
      const isExpanded = expandedCategories.has(category.id);
      const hasChildren = category.children && category.children.length > 0;
      const hasWords = category.words && category.words.length > 0;
      const paddingLeft = level * 20;

      return (
        <div key={category.id} className="select-none">
          <div 
            className="flex items-center py-2 px-3 hover:bg-gray-50 rounded-lg cursor-pointer group transition-colors"
            style={{ paddingLeft: `${paddingLeft + 12}px` }}
          >
            {/* Expand/Collapse Icon */}
            <div className="w-5 h-5 mr-2 flex items-center justify-center">
              {hasChildren && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategory(category.id);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              )}
            </div>

            {/* Category Icon */}
            <div className="text-xl mr-3">
              {category.icon}
            </div>

            {/* Category Info */}
            <div 
              className="flex-1 flex items-center justify-between"
              onClick={() => handleCategorySelect(category)}
            >
              <div>
                <h3 className="font-medium text-gray-800 group-hover:text-blue-600">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {category.wordCount} từ
                  {level === 0 && ` • Cấp ${category.level + 1}`}
                </p>
              </div>

              {hasWords && (
                <div className="flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span>Chọn</span>
                </div>
              )}
            </div>
          </div>

          {/* Children Categories */}
          {isExpanded && hasChildren && (
            <div className="ml-4 border-l border-gray-200">
              {renderCategoryTree(category.children!, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 text-gray-700 hover:bg-white transition-all duration-300 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Quay lại</span>
            </button>
          )}
          
          <div className="text-center flex-1">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              🌳 Chọn chủ đề từ vựng
            </h1>
            <p className="text-gray-600">
              Duyệt theo cấu trúc phân cấp để tìm nội dung phù hợp
            </p>
          </div>
          
          <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel - Quick Options */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                Tùy chọn nhanh
              </h3>
              
              <div className="space-y-3">
                {/* All Categories */}
                <button
                  onClick={() => onSelectionComplete({ type: 'all' })}
                  className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🌟</span>
                    <div>
                      <div className="font-medium">Tất cả từ vựng</div>
                      <div className="text-sm opacity-90">Toàn bộ bộ từ điển</div>
                    </div>
                  </div>
                </button>

                {/* Personal Collection */}
                <button
                  onClick={() => onSelectionComplete({ type: 'personal' })}
                  disabled={personalCollection.length === 0}
                  className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">💖</span>
                    <div>
                      <div className="font-medium">Bộ sưu tập</div>
                      <div className="text-sm opacity-90">{personalCollection.length} từ đã lưu</div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Search */}
              <div className="mt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm danh mục..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Category Tree */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center">
                <Folder className="w-5 h-5 mr-2 text-blue-500" />
                Cấu trúc phân cấp từ vựng
              </h3>

              <div className="max-h-[600px] overflow-y-auto">
                {renderCategoryTree(hierarchicalCategories)}
              </div>

              {searchQuery && filterCategories(hierarchicalCategories, searchQuery).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Không tìm thấy danh mục nào phù hợp với "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <span className="text-2xl mr-3">💡</span>
            Hướng dẫn sử dụng
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">🌳 Duyệt theo cây</h4>
              <p className="text-blue-100">
                Nhấn vào mũi tên để mở rộng danh mục con và khám phá cấu trúc phân cấp
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">🔍 Tìm kiếm thông minh</h4>
              <p className="text-blue-100">
                Tìm kiếm theo tên danh mục hoặc từ vựng để nhanh chóng tìm nội dung
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeCategorySelector;
