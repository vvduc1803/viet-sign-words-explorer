
import React from 'react';
import { X, Star, Check, Zap } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleUpgrade = () => {
    // Simulate upgrade process (will be replaced with real payment later)
    console.log('Upgrade to Plus');
    onClose();
  };

  const features = [
    'Tra cứu không giới hạn từ vựng',
    'Tải lên không giới hạn tài liệu',
    'Ôn tập không giới hạn',
    'Lưu không giới hạn từ vào bộ sưu tập',
    'Truy cập sớm các tính năng mới',
    'Không có quảng cáo',
    'Hỗ trợ ưu tiên 24/7'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full animate-bounce-in">
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-r from-education-blue to-education-purple rounded-t-2xl text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Star className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Nâng cấp lên Plus</h2>
            <p className="text-blue-100 text-lg">Mở khóa toàn bộ tính năng và sử dụng không giới hạn</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Pricing */}
          <div className="text-center mb-8">
            <div className="inline-flex items-baseline">
              <span className="text-4xl font-bold text-gray-800">299.000₫</span>
              <span className="text-lg text-gray-600 ml-2">/tháng</span>
            </div>
            <p className="text-green-600 font-medium mt-2">Tiết kiệm 40% so với gói năm!</p>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-gray-800 text-lg mb-4">Những gì bạn nhận được:</h3>
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-education-blue to-education-purple text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5" />
              <span>Nâng cấp ngay - 299.000₫/tháng</span>
            </button>
            
            <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors duration-300">
              Xem gói năm (Tiết kiệm 40%)
            </button>
          </div>

          {/* Trust indicators */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>✓ Hủy bất cứ lúc nào • ✓ Đảm bảo hoàn tiền 30 ngày • ✓ Thanh toán an toàn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;
