
import React from 'react';
import { VocabularyItem } from '../data/vocabulary';
import VideoPlayer from './VideoPlayer';

interface WordTooltipProps {
  word: VocabularyItem;
  position: { x: number; y: number };
  settings: {
    showDescription: boolean;
    showImage: boolean;
    showVideo: boolean;
    showSignVideo: boolean;
  };
  onClose: () => void;
}

const WordTooltip: React.FC<WordTooltipProps> = ({ word, position, settings, onClose }) => {
  return (
    <>
      {/* Overlay to catch clicks outside */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Tooltip */}
      <div
        className="fixed z-50 bg-white rounded-xl shadow-2xl border border-gray-200 max-w-sm animate-bounce-in"
        style={{
          left: Math.min(position.x, window.innerWidth - 384), // 384px = max-w-sm
          top: Math.min(position.y + 10, window.innerHeight - 300),
        }}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800 text-lg">{word.word}</h3>
            <span className="px-2 py-1 bg-education-blue text-white rounded text-xs">
              {word.theme}
            </span>
          </div>

          {/* Description */}
          {settings.showDescription && word.description && (
            <div className="mb-3">
              <p className="text-sm text-gray-600 leading-relaxed">
                {word.description}
              </p>
            </div>
          )}

          {/* Media Grid */}
          <div className="space-y-3">
            {/* Image */}
            {settings.showImage && (
              <div>
                <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-education-green rounded-full mr-2"></div>
                  Hình ảnh
                </h4>
                <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={word.image}
                    alt={word.word}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Video Demo */}
            {settings.showVideo && word.video && (
              <div>
                <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-education-orange rounded-full mr-2"></div>
                  Video minh họa
                </h4>
                <VideoPlayer
                  src={word.video}
                  title={`Video minh họa: ${word.word}`}
                  className="w-full h-32"
                />
              </div>
            )}

            {/* Sign Language Video */}
            {settings.showSignVideo && word.sign_language_video && (
              <div>
                <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                  <div className="w-2 h-2 bg-education-purple rounded-full mr-2"></div>
                  Ngôn ngữ ký hiệu
                </h4>
                <VideoPlayer
                  src={word.sign_language_video}
                  title={`Ngôn ngữ ký hiệu: ${word.word}`}
                  className="w-full h-32"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WordTooltip;
