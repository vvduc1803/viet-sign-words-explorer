
import React, { useState } from 'react';
import { Search, Grid, List, Filter, BookmarkPlus, Bookmark } from 'lucide-react';
import { themes, getWordsByTheme, getAllWords, VocabularyItem, isInPersonalCollection, addToPersonalCollection, removeFromPersonalCollection } from '../data/vocabulary';
import { HierarchicalCategory, hierarchicalCategories, getWordsFromCategory } from '../data/hierarchicalVocabulary';
import WordModal from '../components/WordModal';
import TreeCategorySelector from '../components/TreeCategorySelector';
import HierarchicalVocabularyBrowser from '../components/HierarchicalVocabularyBrowser';

const Dictionary = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedWord, setSelectedWord] = useState<VocabularyItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [currentView, setCurrentView] = useState<'selector' | 'browser' | 'legacy'>('selector');
  const [selectedCategory, setSelectedCategory] = useState<HierarchicalCategory | null>(null);
  const [categoryWords, setCategoryWords] = useState<VocabularyItem[]>([]);

  // Listen for personal collection changes
  React.useEffect(() => {
    const handleCollectionChange = () => {
      setRefreshKey(prev => prev + 1);
    };

    window.addEventListener('personalCollectionChanged', handleCollectionChange);
    return () => window.removeEventListener('personalCollectionChanged', handleCollectionChange);
  }, []);

  const handleCategorySelection = (selection: {
    type: 'category' | 'personal' | 'all';
    categoryId?: string;
    categoryName?: string;
  }) => {
    if (selection.type === 'category' && selection.categoryId) {
      // Find the selected category
      const findCategory = (cats: HierarchicalCategory[], id: string): HierarchicalCategory | null => {
        for (const cat of cats) {
          if (cat.id === selection.categoryId) return cat;
          if (cat.children) {
            const found = findCategory(cat.children, id);
            if (found) return found;
          }
        }
        return null;
      };

      const category = findCategory(hierarchicalCategories, selection.categoryId);
      if (category) {
        setSelectedCategory(category);
        const words = getWordsFromCategory(hierarchicalCategories, selection.categoryId);
        setCategoryWords(words);
        setCurrentView('browser');
      }
    } else if (selection.type === 'all') {
      setSelectedTheme('all');
      setCurrentView('legacy');
    } else if (selection.type === 'personal') {
      setCurrentView('legacy');
      // Handle personal collection in legacy view
    }
  };

  const getFilteredWords = () => {
    let words = selectedTheme === 'all' ? getAllWords() : getWordsByTheme(selectedTheme);
    
    if (searchQuery.trim()) {
      words = words.filter(word => 
        word.word.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return words;
  };

  const filteredWords = getFilteredWords();

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

  // Show tree category selector
  if (currentView === 'selector') {
    return (
      <TreeCategorySelector
        onSelectionComplete={handleCategorySelection}
        mode="dictionary"
      />
    );
  }

  // Show hierarchical browser
  if (currentView === 'browser' && selectedCategory) {
    return (
      <HierarchicalVocabularyBrowser
        category={selectedCategory}
        words={categoryWords}
        onBack={() => setCurrentView('selector')}
      />
    );
  }

  // Legacy view (original dictionary)
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Từ điển Theo Chủ đề
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Khám phá từ vựng tiếng Việt được phân loại theo chủ đề với hình ảnh và video minh họa
          </p>
          
          {/* Switch to Tree View */}
          <button
            onClick={() => setCurrentView('selector')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg"
          >
            🌳 Chuyển sang chế độ cây phân cấp
          </button>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 animate-slide-up">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Theme Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="w-4 h-4 inline mr-1" />
                Chủ đề
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

            {/* Search */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="w-4 h-4 inline mr-1" />
                Tìm kiếm từ
              </label>
              <input
                type="text"
                placeholder="Nhập từ cần tìm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </div>

            {/* View Mode */}
            <div className="flex-shrink-0">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hiển thị
              </label>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-white shadow-sm text-education-blue'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Grid className="w-4 h-4 mr-1" />
                  Lưới
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center px-3 py-2 rounded-md transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-white shadow-sm text-education-blue'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <List className="w-4 h-4 mr-1" />
                  Danh sách
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 text-center shadow-lg card-hover">
            <div className="text-3xl font-bold text-education-blue mb-2">
              {filteredWords.length}
            </div>
            <div className="text-gray-600">Từ được tìm thấy</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg card-hover">
            <div className="text-3xl font-bold text-education-green mb-2">
              {themes.length}
            </div>
            <div className="text-gray-600">Chủ đề</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg card-hover">
            <div className="text-3xl font-bold text-education-orange mb-2">
              {getAllWords().length}
            </div>
            <div className="text-gray-600">Tổng từ vựng</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-lg card-hover">
            <div className="text-3xl font-bold text-education-purple mb-2">
              100%
            </div>
            <div className="text-gray-600">Có video ký hiệu</div>
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
              Thử thay đổi chủ đề hoặc từ khóa tìm kiếm
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
                            <p className="text-sm text-education-blue">{word.theme}</p>
                          </div>
                          <button
                            onClick={(e) => handleToggleCollection(word, e)}
                            className={`ml-2 p-2 rounded-full transition-all duration-300 ${
                              isInCollection
                                ? 'bg-education-blue text-white hover:bg-blue-600'
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
                        <p className="text-sm text-education-blue mb-1">{word.theme}</p>
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
                            ? 'bg-education-blue text-white hover:bg-blue-600'
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

        {/* Theme Overview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {themes.map((theme, index) => {
            const wordsInTheme = getWordsByTheme(theme);
            const colors = ['bg-education-blue', 'bg-education-green', 'bg-education-purple'];
            
            return (
              <div
                key={theme}
                className={`${colors[index]} rounded-2xl p-8 text-white cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105`}
                onClick={() => setSelectedTheme(theme)}
              >
                <h3 className="text-2xl font-bold mb-4">{theme}</h3>
                <p className="text-lg opacity-90 mb-4">
                  {wordsInTheme.length} từ vựng
                </p>
                <div className="flex flex-wrap gap-2">
                  {wordsInTheme.slice(0, 3).map(word => (
                    <span
                      key={word.id}
                      className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm"
                    >
                      {word.word}
                    </span>
                  ))}
                  {wordsInTheme.length > 3 && (
                    <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">
                      +{wordsInTheme.length - 3}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Word Modal */}
      <WordModal
        word={selectedWord}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Dictionary;
