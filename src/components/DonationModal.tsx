
import React, { useState } from 'react';
import { X, Heart, QrCode, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState(100000);
  const [donorName, setDonorName] = useState('');
  const [message, setMessage] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAmount >= 10000 && donorName.trim()) {
      console.log('Donation submitted:', { amount: selectedAmount, donorName, message });
      setShowThankYou(true);
    }
  };

  const donationAmounts = [
    { amount: 50000, label: '50.000₫' },
    { amount: 100000, label: '100.000₫' },
    { amount: 200000, label: '200.000₫' },
    { amount: 500000, label: '500.000₫' }
  ];

  // Thank you screen
  if (showThankYou) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-pink-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Cảm ơn bạn rất nhiều!</h3>
          <p className="text-gray-600 mb-4">
            Sự ủng hộ của <strong>{donorName}</strong> sẽ giúp chúng tôi tiếp tục phát triển từ điển ngôn ngữ ký hiệu và hỗ trợ cộng đồng người điếc Việt Nam.
          </p>
          {message && (
            <div className="bg-pink-50 rounded-xl p-4 mb-4">
              <p className="text-sm text-gray-700 italic">"{message}"</p>
            </div>
          )}
          <p className="text-sm text-gray-500 mb-6">
            Chúng tôi đã ghi nhận khoản ủng hộ <strong>{selectedAmount.toLocaleString()}₫</strong> của bạn. 
            Mọi đóng góp đều có ý nghĩa và tạo nên sự khác biệt!
          </p>
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          >
            Đóng
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-t-2xl text-white">
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
            <h2 className="text-2xl font-bold mb-2">Ủng hộ Dự án</h2>
            <p className="text-pink-100">Cùng xây dựng cầu nối giao tiếp cho cộng đồng người điếc</p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* QR Code và thông tin chuyển khoản */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin chuyển khoản</h3>
                
                {/* QR Code */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <div className="w-48 h-48 bg-white rounded-lg mx-auto flex items-center justify-center border-2 border-dashed border-gray-300">
                    <QrCode className="w-32 h-32 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mt-4">Quét mã QR để chuyển khoản</p>
                </div>

                {/* Thông tin tài khoản */}
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Số tài khoản</p>
                    <p className="text-xl font-bold text-gray-800">1234567890</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ngân hàng</p>
                    <p className="text-lg font-bold text-gray-800">Vietcombank</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Chủ tài khoản</p>
                    <p className="text-lg font-bold text-gray-800">DU AN TU DIEN KY HIEU</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Số tiền</p>
                    <p className="text-2xl font-bold text-pink-600">{selectedAmount.toLocaleString()}₫</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nội dung chuyển khoản</p>
                    <p className="text-lg font-bold text-gray-800">UNG HO DU AN</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form thông tin người ủng hộ */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Thông tin ủng hộ</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Chọn số tiền */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">
                    Chọn số tiền ủng hộ
                  </Label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {donationAmounts.map((donation) => (
                      <button
                        key={donation.amount}
                        type="button"
                        onClick={() => setSelectedAmount(donation.amount)}
                        className={`p-3 border-2 rounded-xl transition-all duration-300 text-center ${
                          selectedAmount === donation.amount
                            ? 'border-pink-500 bg-pink-50 text-pink-700'
                            : 'border-gray-200 hover:border-pink-300 hover:bg-pink-25'
                        }`}
                      >
                        <div className="font-bold">{donation.label}</div>
                      </button>
                    ))}
                  </div>
                  <Input
                    type="number"
                    placeholder="Hoặc nhập số tiền khác"
                    value={selectedAmount}
                    onChange={(e) => setSelectedAmount(Number(e.target.value))}
                    min="10000"
                    step="1000"
                    className="w-full"
                  />
                </div>

                {/* Tên người ủng hộ */}
                <div>
                  <Label htmlFor="donorName" className="text-sm font-medium text-gray-700 mb-2 block">
                    Tên người ủng hộ *
                  </Label>
                  <Input
                    id="donorName"
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Nhập tên của bạn"
                    required
                    className="w-full"
                  />
                </div>

                {/* Lời nhắn */}
                <div>
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                    Lời nhắn gửi đến nhóm dự án
                  </Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Chia sẻ lời động viên hoặc mong muốn của bạn dành cho dự án..."
                    rows={4}
                    className="w-full resize-none"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Lưu ý:</strong> Vui lòng chuyển khoản đúng số tiền và nội dung "UNG HO DU AN". 
                    Sau khi chuyển khoản thành công, hãy ấn nút "Hoàn tất" bên dưới.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={selectedAmount < 10000 || !donorName.trim()}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 text-lg font-semibold"
                >
                  Hoàn tất ủng hộ
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
