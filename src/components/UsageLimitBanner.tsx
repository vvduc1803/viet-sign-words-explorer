
import React from 'react';
import { AlertTriangle, Heart, Zap } from 'lucide-react';

interface UsageLimitBannerProps {
  isLoggedIn: boolean;
  isPremium: boolean;
  currentUsage: {
    searches: number;
    uploads: number;
    practices: number;
  };
  onLogin: () => void;
  onUpgrade: () => void;
}

const UsageLimitBanner: React.FC<UsageLimitBannerProps> = ({
  isLoggedIn,
  isPremium,
  currentUsage,
  onLogin,
  onUpgrade,
}) => {
  const limits = {
    searches: isLoggedIn ? (isPremium ? -1 : 50) : 10,
    uploads: isLoggedIn ? (isPremium ? -1 : 20) : 5,
    practices: isLoggedIn ? (isPremium ? -1 : 30) : 3,
  };

  const getUsagePercentage = (current: number, limit: number) => {
    if (limit === -1) return 0; // Unlimited
    return Math.min((current / limit) * 100, 100);
  };

  const isNearLimit = (current: number, limit: number) => {
    if (limit === -1) return false;
    return current >= limit * 0.8;
  };

  const isAtLimit = (current: number, limit: number) => {
    if (limit === -1) return false;
    return current >= limit;
  };

  if (isPremium) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="w-5 h-5 text-green-600 mr-3" />
            <div>
              <h3 className="font-semibold text-green-800">Cảm ơn bạn đã ủng hộ!</h3>
              <p className="text-green-600 text-sm">Bạn đang giúp xây dựng cộng đồng giao tiếp không rào cản</p>
            </div>
          </div>
          <div className="text-green-600 font-medium">Không giới hạn</div>
        </div>
      </div>
    );
  }

  const showWarning = !isLoggedIn || 
    isNearLimit(currentUsage.searches, limits.searches) ||
    isNearLimit(currentUsage.uploads, limits.uploads) ||
    isNearLimit(currentUsage.practices, limits.practices);

  if (!showWarning) return null;

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-amber-800 mb-2">
              {!isLoggedIn ? 'Giới hạn sử dụng cho khách' : 'Sắp đạt giới hạn sử dụng'}
            </h3>
            
            <div className="space-y-2 mb-3">
              {/* Searches */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tra cứu:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        isAtLimit(currentUsage.searches, limits.searches) ? 'bg-red-500' :
                        isNearLimit(currentUsage.searches, limits.searches) ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${getUsagePercentage(currentUsage.searches, limits.searches)}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {currentUsage.searches}/{limits.searches === -1 ? '∞' : limits.searches}
                  </span>
                </div>
              </div>

              {/* Uploads */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Tải lên:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        isAtLimit(currentUsage.uploads, limits.uploads) ? 'bg-red-500' :
                        isNearLimit(currentUsage.uploads, limits.uploads) ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${getUsagePercentage(currentUsage.uploads, limits.uploads)}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {currentUsage.uploads}/{limits.uploads === -1 ? '∞' : limits.uploads}
                  </span>
                </div>
              </div>

              {/* Practices */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Ôn tập:</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        isAtLimit(currentUsage.practices, limits.practices) ? 'bg-red-500' :
                        isNearLimit(currentUsage.practices, limits.practices) ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${getUsagePercentage(currentUsage.practices, limits.practices)}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {currentUsage.practices}/{limits.practices === -1 ? '∞' : limits.practices}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2 ml-4">
          {!isLoggedIn && (
            <button
              onClick={onLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
            >
              Đăng nhập
            </button>
          )}
          <button
            onClick={onUpgrade}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap flex items-center space-x-1"
          >
            <Heart className="w-4 h-4" />
            <span>Ủng hộ dự án</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsageLimitBanner;
