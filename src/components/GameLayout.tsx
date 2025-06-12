
import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GameLayoutProps {
  title: string;
  score: number;
  children: React.ReactNode;
  onBackClick?: () => void;
}

const GameLayout: React.FC<GameLayoutProps> = ({ title, score, children, onBackClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/games" 
            className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 text-white hover:bg-white/30 transition-all duration-300"
            onClick={onBackClick}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại</span>
          </Link>
          
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center flex-1">
            {title}
          </h1>
          
          <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <Star className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-bold text-lg">{score}</span>
          </div>
        </div>

        {/* Game Content */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GameLayout;
