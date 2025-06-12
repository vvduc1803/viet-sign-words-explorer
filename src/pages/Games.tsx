
import React from 'react';
import { Link } from 'react-router-dom';
import { GamepadIcon, Camera, MapPin, Star } from 'lucide-react';

const Games = () => {
  const games = [
    {
      id: 'match-game',
      title: 'Ghép từ với hình ảnh',
      description: 'Xem video ký hiệu và chọn từ đúng!',
      icon: GamepadIcon,
      color: 'from-blue-400 to-purple-500',
      path: '/games/match'
    },
    {
      id: 'mimic-game',
      title: 'Bắt chước ký hiệu',
      description: 'Xem video và bắt chước động tác!',
      icon: Camera,
      color: 'from-green-400 to-blue-500',
      path: '/games/mimic'
    },
    {
      id: 'treasure-game',
      title: 'Tìm kho báu từ vựng',
      description: 'Khám phá bản đồ và tìm từ mới!',
      icon: MapPin,
      color: 'from-orange-400 to-pink-500',
      path: '/games/treasure'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            🎮 Trò chơi học từ vựng
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Học ngôn ngữ ký hiệu một cách vui vẻ với những trò chơi thú vị!
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => {
            const IconComponent = game.icon;
            return (
              <Link
                key={game.id}
                to={game.path}
                className="group transform hover:scale-105 transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${game.color} rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300`}>
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/30 transition-all duration-300">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {game.title}
                    </h3>
                    
                    <p className="text-white/90 text-lg leading-relaxed">
                      {game.description}
                    </p>
                    
                    <div className="mt-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 inline-flex items-center space-x-2 text-white font-medium group-hover:bg-white/30 transition-all duration-300">
                        <Star className="w-5 h-5" />
                        <span>Chơi ngay</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Fun Facts */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">
              🌟 Bạn có biết?
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Ngôn ngữ ký hiệu không chỉ giúp giao tiếp mà còn kích thích sự phát triển não bộ, 
              tăng cường khả năng tập trung và trí nhớ của trẻ em!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
