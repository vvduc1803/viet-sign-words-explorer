
import React, { useState } from 'react';
import { Search, Grid, List, Filter } from 'lucide-react';
import { themes, getWordsByTheme, getAllWords, VocabularyItem } from '../data/vocabulary';
import WordModal from '../components/WordModal';

const Dictionary = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedWord, setSelectedWord] = useState<VocabularyItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Từ điển Theo Chủ đề
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá từ vựng tiếng Việt được phân loại theo chủ đề với hình ảnh và video minh họa
          </p>
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
                {filteredWords.map(word => (
                  <div
                    key={word.id}
                    onClick={() => handleWordClick(word)}
                    className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer card-hover group"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={word.image}
                        alt={word.word}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1">{word.word}</h3>
                      <p className="text-sm text-education-blue">{word.theme}</p>
                      {word.description && (
                        <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                          {word.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                {filteredWords.map((word, index) => (
                  <div
                    key={word.id}
                    onClick={() => handleWordClick(word)}
                    className={`flex items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-300 group ${
                      index !== filteredWords.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                      <img
                        src={word.image}
                        alt={word.word}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{word.word}</h3>
                      <p className="text-sm text-education-blue mb-1">{word.theme}</p>
                      {word.description && (
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {word.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
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
