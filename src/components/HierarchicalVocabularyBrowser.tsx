
import React, { useState } from 'react';
import { ArrowLeft, Search, Grid, List, BookmarkPlus, Bookmark, ChevronRight } from 'lucide-react';
import { HierarchicalCategory, getWordsFromCategory } from '../data/hierarchicalVocabulary';
import { VocabularyItem, isInPersonalCollection, addToPersonalCollection, removeFromPersonalCollection } from '../data/vocabulary';
import WordModal from './WordModal';

interface HierarchicalVocabularyBrowserProps {
  category: HierarchicalCategory;
  words: VocabularyItem[];
  onBack: () => void;
}

const HierarchicalVocabularyBrowser: React.FC<HierarchicalVocabularyBrowserProps> = ({
  category,
  words,
  onBack
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedWord, setSelectedWord] = useState<VocabularyItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Get breadcrumb path
  const getBreadcrumbPath = (categoryId: string): string[] => {
    return categoryId.split('/');
  };

  const breadcrumbPath = getBreadcrumbPath(category.id);

  // Filter words based on search
  const filteredWords = words.filter(word =>
    word.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleWordClick = (word: VocabularyItem) => {
    setSelectedWord(word);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedWord(null);
  };

  const handleToggleCollection = (word: VocabularyItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const isInCollection = isInPersonalCollection(word.id);
    
    if (isInCollection) {
      removeFromPersonalCollection(word.id);
    } else {
      addToPersonalCollection(word.id);
    }
    
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Breadcrumb */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 text-gray-700 hover:bg-white transition-all duration-300 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Quay lại</span>
            </button>

            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <span>📁</span>
              {breadcrumbPath.map((path, index) => (
                <React.Fragment key={index}>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <span className={index === breadcrumbPath.length - 1 ? 'font-medium text-gray-800' : ''}>
                    {path}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-2">{category.icon}</div>
            <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
              {category.name}
            </h1>
            <p className="text-lg text-gray-600">
              {filteredWords.length} từ vựng có sẵn
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Tìm kiếm từ trong danh mục này..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* View Mode */}
            <div className="flex-shrink-0">
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Grid className="w-4 h-4 mr-2" />
                  Lưới
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-white shadow-sm text-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <List className="w-4 h-4 mr-2" />
                  Danh sách
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Words Display */}
        {filteredWords.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Không tìm thấy từ nào
            </h3>
            <p className="text-gray-500">
              {searchQuery 
                ? `Không có từ nào phù hợp với "${searchQuery}"`
                : 'Danh mục này chưa có từ vựng nào'
              }
            </p>
          </div>
        ) : (
          <div className="animate-bounce-in">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredWords.map(word => {
                  const isInCollection = isInPersonalCollection(word.id);
                  
                  return (
                    <div
                      key={`${word.id}-${refreshKey}`}
                      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer card-hover group relative"
                    >
                      <div 
                        onClick={() => handleWordClick(word)}
                        className="aspect-square overflow-hidden"
                      >
                        <img
                          src={word.image}
                          alt={word.word}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1" onClick={() => handleWordClick(word)}>
                            <h3 className="font-semibold text-gray-800 mb-1">{word.word}</h3>
                            <div className="flex flex-wrap gap-1">
                              {word.categories?.slice(0, 2).map((cat, idx) => (
                                <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                                  {cat}
                                </span>
                              ))}
                              {word.categories && word.categories.length > 2 && (
                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                  +{word.categories.length - 2}
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={(e) => handleToggleCollection(word, e)}
                            className={`ml-2 p-2 rounded-full transition-all duration-300 ${
                              isInCollection
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                            title={isInCollection ? 'Xóa khỏi bộ sưu tập' : 'Thêm vào bộ sưu tập'}
                          >
                            {isInCollection ? (
                              <Bookmark className="w-4 h-4" />
                            ) : (
                              <BookmarkPlus className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {word.description && (
                          <p className="text-xs text-gray-500 mt-2 line-clamp-2" onClick={() => handleWordClick(word)}>
                            {word.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {filteredWords.map((word, index) => {
                  const isInCollection = isInPersonalCollection(word.id);
                  
                  return (
                    <div
                      key={`${word.id}-${refreshKey}`}
                      className={`flex items-center p-6 hover:bg-gray-50 transition-colors duration-300 group ${
                        index !== filteredWords.length - 1 ? 'border-b border-gray-100' : ''
                      }`}
                    >
                      <div 
                        onClick={() => handleWordClick(word)}
                        className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0 cursor-pointer"
                      >
                        <img
                          src={word.image}
                          alt={word.word}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1" onClick={() => handleWordClick(word)}>
                        <h3 className="font-semibold text-gray-800 mb-1 cursor-pointer">{word.word}</h3>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {word.categories?.map((cat, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                              {cat}
                            </span>
                          ))}
                        </div>
                        {word.description && (
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {word.description}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={(e) => handleToggleCollection(word, e)}
                        className={`ml-4 p-3 rounded-full transition-all duration-300 ${
                          isInCollection
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        title={isInCollection ? 'Xóa khỏi bộ sưu tập' : 'Thêm vào bộ sưu tập'}
                      >
                        {isInCollection ? (
                          <Bookmark className="w-5 h-5" />
                        ) : (
                          <BookmarkPlus className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Word Modal */}
        <WordModal
          word={selectedWord}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </div>
  );
};

export default HierarchicalVocabularyBrowser;
