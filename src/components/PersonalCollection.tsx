
import React, { useState, useEffect } from 'react';
import { Heart, Trash2, Play, ArrowLeft, BookOpen } from 'lucide-react';
import { getPersonalCollection, removeFromPersonalCollection, VocabularyItem } from '../data/vocabulary';
import VideoPlayer from './VideoPlayer';

interface PersonalCollectionProps {
  onBack: () => void;
  onPlayGame?: (words: VocabularyItem[]) => void;
}

const PersonalCollection: React.FC<PersonalCollectionProps> = ({ onBack, onPlayGame }) => {
  const [collection, setCollection] = useState<VocabularyItem[]>([]);
  const [selectedWord, setSelectedWord] = useState<VocabularyItem | null>(null);

  useEffect(() => {
    setCollection(getPersonalCollection());
  }, []);

  const handleRemove = (wordId: string) => {
    removeFromPersonalCollection(wordId);
    setCollection(getPersonalCollection());
    if (selectedWord?.id === wordId) {
      setSelectedWord(null);
    }
  };

  const handlePlayGames = () => {
    if (onPlayGame && collection.length > 0) {
      onPlayGame(collection);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white hover:bg-white/30 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại</span>
          </button>
          
          <div className="text-center flex-1">
            <div className="text-4xl mb-2">💖</div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Bộ sưu tập của tôi
            </h1>
            <p className="text-white/80 mt-2">
              {collection.length} từ đã lưu
            </p>
          </div>
          
          {collection.length > 0 && (
            <button
              onClick={handlePlayGames}
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 rounded-xl px-4 py-2 text-white font-medium transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              <span>Chơi game</span>
            </button>
          )}
        </div>

        {collection.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-8xl mb-6">💔</div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Bộ sưu tập trống
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Hãy thêm những từ yêu thích vào bộ sưu tập của bạn!
            </p>
            <button
              onClick={onBack}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300"
            >
              Khám phá từ vựng
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Words List */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Danh sách từ vựng
              </h3>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 max-h-96 overflow-y-auto">
                {collection.map((word) => (
                  <div
                    key={word.id}
                    className={`flex items-center justify-between p-4 rounded-xl mb-2 cursor-pointer transition-all duration-300 ${
                      selectedWord?.id === word.id
                        ? 'bg-purple-100 border-2 border-purple-400'
                        : 'bg-gray-50 hover:bg-purple-50'
                    }`}
                    onClick={() => setSelectedWord(word)}
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={word.image}
                        alt={word.word}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-bold text-gray-800">{word.word}</h4>
                        <p className="text-sm text-gray-600">
                          {word.category} • {word.subcategory}
                        </p>
                      </div>
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(word.id);
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Word Detail */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-2" />
                Chi tiết từ vựng
              </h3>
              
              {selectedWord ? (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {selectedWord.word}
                    </h2>
                    <p className="text-purple-600 font-medium">
                      {selectedWord.category} • {selectedWord.subcategory}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Image */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Hình ảnh</h4>
                      <img
                        src={selectedWord.image}
                        alt={selectedWord.word}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>

                    {/* Sign Language Video */}
                    {selectedWord.sign_language_video && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Video ký hiệu</h4>
                        <VideoPlayer
                          src={selectedWord.sign_language_video}
                          title={`Ký hiệu: ${selectedWord.word}`}
                          className="w-full h-48"
                        />
                      </div>
                    )}

                    {/* Description */}
                    {selectedWord.description && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2">Mô tả</h4>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {selectedWord.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 text-center">
                  <div className="text-6xl mb-4">👆</div>
                  <p className="text-gray-600 text-lg">
                    Chọn một từ từ danh sách để xem chi tiết
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalCollection;
