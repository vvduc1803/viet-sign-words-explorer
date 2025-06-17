
import React, { useState } from 'react';
import { X, QrCode, Upload, CreditCard, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose }) => {
  const { user, submitPayment } = useAuth();
  const [accountNumber, setAccountNumber] = useState('');
  const [bankName, setBankName] = useState('');
  const [transferImage, setTransferImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTransferImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountNumber || !bankName || !transferImage) return;

    setIsSubmitting(true);
    try {
      await submitPayment({
        accountNumber,
        bankName,
        transferImage,
        amount: 299000,
        userId: user?.id || ''
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Payment submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Đã gửi thông tin!</h3>
          <p className="text-gray-600 mb-6">
            Chúng tôi đã nhận được thông tin thanh toán của bạn. Vui lòng chờ 5-10 phút để chúng tôi xác nhận và nâng cấp tài khoản.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-education-blue text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 bg-gradient-to-r from-education-blue to-education-purple rounded-t-2xl text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <CreditCard className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Thanh toán nâng cấp Plus</h2>
            <p className="text-blue-100">Chuyển khoản để nâng cấp tài khoản của bạn</p>
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
                  <div className="w-48 h-48 bg-white rounded-lg mx-auto flex items-center justify-center border">
                    <QrCode className="w-32 h-32 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mt-4">Quét mã QR để chuyển khoản</p>
                </div>

                {/* Thông tin tài khoản */}
                <div className="bg-blue-50 rounded-xl p-6 space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Số tài khoản</p>
                    <p className="text-lg font-bold text-gray-800">1234567890</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ngân hàng</p>
                    <p className="text-lg font-bold text-gray-800">Vietcombank</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Chủ tài khoản</p>
                    <p className="text-lg font-bold text-gray-800">CONG TY ABC</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Số tiền</p>
                    <p className="text-2xl font-bold text-education-blue">299.000₫</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nội dung chuyển khoản</p>
                    <p className="text-lg font-bold text-gray-800">PLUS {user?.id || 'USER'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form nhập thông tin */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Xác nhận thanh toán</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số tài khoản của bạn
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Nhập số tài khoản đã chuyển"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-education-blue focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ngân hàng của bạn
                  </label>
                  <select
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-education-blue focus:border-transparent"
                    required
                  >
                    <option value="">Chọn ngân hàng</option>
                    <option value="Vietcombank">Vietcombank</option>
                    <option value="VietinBank">VietinBank</option>
                    <option value="BIDV">BIDV</option>
                    <option value="Agribank">Agribank</option>
                    <option value="Techcombank">Techcombank</option>
                    <option value="MBBank">MBBank</option>
                    <option value="ACB">ACB</option>
                    <option value="VPBank">VPBank</option>
                    <option value="Sacombank">Sacombank</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ảnh chụp màn hình chuyển khoản
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      id="transfer-image"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      required
                    />
                    <label
                      htmlFor="transfer-image"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-education-blue hover:bg-blue-50 transition-all"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">
                          {transferImage ? transferImage.name : 'Chọn ảnh chuyển khoản'}
                        </p>
                        <p className="text-sm text-gray-400">PNG, JPG tối đa 10MB</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Lưu ý:</strong> Vui lòng chuyển khoản đúng số tiền và nội dung. 
                    Chúng tôi sẽ xác nhận trong vòng 5-10 phút và nâng cấp tài khoản của bạn.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !accountNumber || !bankName || !transferImage}
                  className="w-full bg-gradient-to-r from-education-blue to-education-purple text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Xác nhận thanh toán'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
