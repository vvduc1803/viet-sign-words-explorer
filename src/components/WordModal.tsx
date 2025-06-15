
import React from 'react';
import { X, ExternalLink, BookmarkPlus, Bookmark } from 'lucide-react';
import { VocabularyItem, isInPersonalCollection, addToPersonalCollection, removeFromPersonalCollection } from '../data/vocabulary';
import VideoPlayer from './VideoPlayer';

interface WordModalProps {
  word: VocabularyItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const WordModal: React.FC<WordModalProps> = ({ word, isOpen, onClose }) => {
  if (!isOpen || !word) return null;

  const isInCollection = isInPersonalCollection(word.id);

  const handleToggleCollection = () => {
    if (isInCollection) {
      removeFromPersonalCollection(word.id);
    } else {
      addToPersonalCollection(word.id);
    }
    // Force re-render by triggering a state update in parent component
    window.dispatchEvent(new CustomEvent('personalCollectionChanged'));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-bounce-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{word.word}</h2>
              <p className="text-education-blue font-medium mt-1">{word.theme}</p>
            </div>
            <button
              onClick={handleToggleCollection}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                isInCollection
                  ? 'bg-education-blue text-white hover:bg-blue-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title={isInCollection ? 'Xóa khỏi bộ sưu tập' : 'Thêm vào bộ sưu tập'}
            >
              {isInCollection ? (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Đã lưu</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-4 h-4" />
                  <span>Lưu</span>
                </>
              )}
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Description */}
          {word.description && (
            <div className="mb-6">
              <p className="text-gray-600 text-lg leading-relaxed">{word.description}</p>
            </div>
          )}

          {/* Media Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <div className="w-3 h-3 bg-education-green rounded-full mr-2"></div>
                Hình ảnh minh họa
              </h3>
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden group">
                <img
                  src={word.image}
                  alt={word.word}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Video Demo */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <div className="w-3 h-3 bg-education-orange rounded-full mr-2"></div>
                Video minh họa
              </h3>
              <VideoPlayer
                src={word.video}
                title={`Video minh họa: ${word.word}`}
                className="aspect-square"
              />
            </div>

            {/* Sign Language Video */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 flex items-center">
                <div className="w-3 h-3 bg-education-purple rounded-full mr-2"></div>
                Video ngôn ngữ ký hiệu
              </h3>
              <VideoPlayer
                src={word.sign_language_video}
                title={`Ngôn ngữ ký hiệu: ${word.word}`}
                className="aspect-square"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300"
            >
              Đóng
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-education-blue to-education-purple text-white rounded-xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2">
              <ExternalLink className="w-4 h-4" />
              <span>Xem thêm</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordModal;
