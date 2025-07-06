
import React, { useState } from 'react';
import { X, Heart, HandHeart, Users, Star, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PaymentModal from './PaymentModal';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginRequired?: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose, onLoginRequired }) => {
  const { user, isLoggedIn } = useAuth();
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(100000);

  if (!isOpen) return null;

  const handleDonate = (amount: number) => {
    if (!isLoggedIn) {
      if (onLoginRequired) {
        onLoginRequired();
      }
      return;
    }
    
    setSelectedAmount(amount);
    setPaymentModalOpen(true);
  };

  const donationAmounts = [
    { amount: 50000, label: '50.000₫', description: 'Hỗ trợ server 1 tuần' },
    { amount: 100000, label: '100.000₫', description: 'Phát triển tính năng mới' },
    { amount: 200000, label: '200.000₫', description: 'Tạo video ký hiệu mới' },
    { amount: 500000, label: '500.000₫', description: 'Mở rộng từ điển' }
  ];

  const impacts = [
    'Phát triển và duy trì từ điển ngôn ngữ ký hiệu miễn phí',
    'Tạo ra hàng nghìn video minh họa chất lượng cao',
    'Hỗ trợ giáo viên và học sinh khuyết tật thính giác',
    'Xây dựng cộng đồng giao tiếp không rào cản',
    'Nghiên cứu và phát triển công nghệ hỗ trợ',
    'Tổ chức các khóa đào tạo ngôn ngữ ký hiệu miễn phí'
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full animate-bounce-in max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="relative p-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-t-2xl text-white">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Ủng hộ Dự án</h2>
              <p className="text-pink-100 text-lg">Cùng xây dựng cầu nối giao tiếp cho cộng đồng người điếc</p>
              {!isLoggedIn && (
                <p className="text-yellow-200 text-sm mt-2 font-medium">⚠️ Bạn cần đăng nhập để quyên góp</p>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Mission Statement */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                <Users className="w-6 h-6 mr-2 text-purple-600" />
                Sứ mệnh của chúng tôi
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Chúng tôi tin rằng <strong>giao tiếp không có rào cản</strong> là quyền cơ bản của mọi người. 
                Từ điển ngôn ngữ ký hiệu này không chỉ là một công cụ học tập, mà còn là 
                <span className="text-purple-600 font-semibold"> cầu nối kết nối cộng đồng người điếc với thế giới xung quanh</span>.
              </p>
              <p className="text-gray-600">
                Mỗi video, mỗi hình ảnh đều được tạo ra với tình yêu và sự tôn trọng dành cho cộng đồng người điếc Việt Nam.
              </p>
            </div>

            {/* Impact Section */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center">
                <HandHeart className="w-5 h-5 mr-2 text-pink-500" />
                Sự đóng góp của bạn sẽ giúp:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {impacts.map((impact, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center mt-0.5">
                      <Heart className="w-4 h-4 text-pink-500" />
                    </div>
                    <span className="text-gray-700 text-sm">{impact}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Donation Amounts */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-800 text-lg mb-4 text-center">
                Chọn mức ủng hộ của bạn
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {donationAmounts.map((donation) => (
                  <button
                    key={donation.amount}
                    onClick={() => handleDonate(donation.amount)}
                    disabled={!isLoggedIn}
                    className="p-4 border-2 border-gray-200 rounded-xl hover:border-pink-500 hover:bg-pink-50 transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="font-bold text-lg text-gray-800">{donation.label}</div>
                    <div className="text-sm text-gray-600">{donation.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount */}
            <div className="mb-8">
              <h4 className="font-medium text-gray-700 mb-3">Hoặc nhập số tiền khác:</h4>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Nhập số tiền (VNĐ)"
                  className="flex-1 input-field"
                  min="10000"
                  step="10000"
                  onChange={(e) => setSelectedAmount(Number(e.target.value))}
                />
                <button
                  onClick={() => handleDonate(selectedAmount)}
                  disabled={!isLoggedIn || selectedAmount < 10000}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Ủng hộ
                </button>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 mb-6">
              <div className="text-center">
                <Star className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h4 className="font-bold text-gray-800 mb-2">Mỗi đóng góp đều có ý nghĩa!</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Không chỉ quyên góp, bạn cũng có thể chia sẻ dự án này với bạn bè, 
                  gia đình để lan tỏa tình yêu và sự quan tâm đến cộng đồng người điếc.
                </p>
                <div className="flex gap-3 justify-center flex-wrap">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Chia sẻ Facebook
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Chia sẻ Zalo
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Sao chép link
                  </button>
                </div>
              </div>
            </div>

            {/* Trust & Transparency */}
            <div className="text-center text-sm text-gray-500">
              <p className="mb-2">
                <span className="text-green-600">✓</span> Minh bạch tài chính • 
                <span className="text-green-600 ml-1">✓</span> Báo cáo định kỳ • 
                <span className="text-green-600 ml-1">✓</span> Thanh toán an toàn
              </p>
              <p className="text-xs">
                Mọi khoản đóng góp sẽ được sử dụng trực tiếp cho việc phát triển và duy trì dự án. 
                Chúng tôi cam kết minh bạch và báo cáo công khai việc sử dụng tài chính.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => {
          setPaymentModalOpen(false);
          onClose();
        }}
        amount={selectedAmount}
        purpose="donation"
      />
    </>
  );
};

export default DonationModal;
