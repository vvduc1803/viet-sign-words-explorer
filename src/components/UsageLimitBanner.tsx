
import React from 'react';
import { AlertCircle, Star, Upload, Search, BookOpen, PenTool } from 'lucide-react';

interface UsageLimitBannerProps {
  isLoggedIn: boolean;
  isPremium: boolean;
  onUpgrade?: () => void;
  onLogin?: () => void;
  currentUsage: {
    searches: number;
    uploads: number;
    practices: number;
    savedWords: number;
  };
}

const UsageLimitBanner: React.FC<UsageLimitBannerProps> = ({ 
  isLoggedIn, 
  isPremium,
  onUpgrade, 
  onLogin,
  currentUsage 
}) => {
  // Don't show banner for premium users
  if (isPremium) {
    return null;
  }

  const limits = isLoggedIn 
    ? { searches: 50, uploads: 3, practices: 3, savedWords: 50 }
    : { searches: 20, uploads: 1, practices: 0, savedWords: 0 };

  const isSearchLimitReached = currentUsage.searches >= limits.searches;
  const isUploadLimitReached = currentUsage.uploads >= limits.uploads;

  if (isSearchLimitReached || isUploadLimitReached) {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 animate-slide-up">
        <div className="flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium text-orange-800 mb-2">
              Đã đạt giới hạn sử dụng hôm nay
            </h4>
            <p className="text-orange-700 text-sm mb-3">
              {isSearchLimitReached && `Bạn đã tra cứu ${currentUsage.searches}/${limits.searches} từ hôm nay. `}
              {isUploadLimitReached && `Bạn đã tải lên ${currentUsage.uploads}/${limits.uploads} tài liệu hôm nay. `}
              {!isLoggedIn ? 'Đăng nhập để tăng giới hạn sử dụng.' : 'Nâng cấp để sử dụng không giới hạn.'}
            </p>
            <div className="flex space-x-3">
              {!isLoggedIn ? (
                <button
                  onClick={onLogin}
                  className="px-4 py-2 bg-education-blue text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  Đăng nhập ngay
                </button>
              ) : (
                <button
                  onClick={onUpgrade}
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <Star className="w-4 h-4" />
                  <span>Nâng cấp Plus</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-blue-800 mb-2">
            {isLoggedIn ? 'Giới hạn hôm nay (Tài khoản thường)' : 'Giới hạn hôm nay (Chưa đăng nhập)'}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700">
                Tra cứu: {currentUsage.searches}/{limits.searches}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Upload className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700">
                Tải lên: {currentUsage.uploads}/{limits.uploads}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <PenTool className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700">
                Ôn tập: {currentUsage.practices}/{limits.practices}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700">
                Bộ sưu tập: {currentUsage.savedWords}/{limits.savedWords}
              </span>
            </div>
          </div>
        </div>
        {isLoggedIn && (
          <button
            onClick={onUpgrade}
            className="px-4 py-2 bg-gradient-to-r from-education-blue to-education-purple text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Star className="w-4 h-4" />
            <span>Nâng cấp Plus</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default UsageLimitBanner;
