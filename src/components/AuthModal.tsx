
import React, { useState } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register' | 'forgot-password' | 'reset-password';
  onModeChange: (mode: 'login' | 'register' | 'forgot-password' | 'reset-password') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onModeChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        onClose();
        setFormData({ email: '', password: '', name: '', confirmPassword: '', newPassword: '', confirmNewPassword: '' });
      } else if (mode === 'register') {
        await register(formData.name, formData.email, formData.password);
        onClose();
        setFormData({ email: '', password: '', name: '', confirmPassword: '', newPassword: '', confirmNewPassword: '' });
      } else if (mode === 'forgot-password') {
        // Simulate forgot password email sending
        await new Promise(resolve => setTimeout(resolve, 1000));
        setEmailSent(true);
        setTimeout(() => {
          setEmailSent(false);
          onModeChange('reset-password');
        }, 2000);
      } else if (mode === 'reset-password') {
        // Simulate password reset
        if (formData.newPassword !== formData.confirmNewPassword) {
          alert('Mật khẩu xác nhận không khớp!');
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Đặt lại mật khẩu thành công!');
        onModeChange('login');
        setFormData({ email: '', password: '', name: '', confirmPassword: '', newPassword: '', confirmNewPassword: '' });
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    setIsLoading(true);
    try {
      await login('test@example.com', 'password123');
      onClose();
    } catch (error) {
      console.error('Quick login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Simulate Google login
    console.log('Google login simulation');
    handleQuickLogin();
  };

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Đăng nhập';
      case 'register': return 'Đăng ký';
      case 'forgot-password': return 'Quên mật khẩu';
      case 'reset-password': return 'Đặt lại mật khẩu';
    }
  };

  const handleBackClick = () => {
    if (mode === 'forgot-password' || mode === 'reset-password') {
      onModeChange('login');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full animate-bounce-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            {(mode === 'forgot-password' || mode === 'reset-password') && (
              <button
                onClick={handleBackClick}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
            )}
            <h2 className="text-2xl font-bold text-gray-800">
              {getTitle()}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'forgot-password' && emailSent && (
            <div className="mb-6 p-4 bg-green-50 rounded-xl flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
              <div>
                <p className="text-green-800 font-medium">Email đã được gửi!</p>
                <p className="text-green-600 text-sm">Chuyển đến trang đặt lại mật khẩu...</p>
              </div>
            </div>
          )}

          {mode !== 'forgot-password' && mode !== 'reset-password' && (
            /* Quick Test Login */
            <div className="mb-6 p-4 bg-blue-50 rounded-xl">
              <h3 className="font-medium text-blue-800 mb-2">🧪 Demo/Test</h3>
              <button
                onClick={handleQuickLogin}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập nhanh (Test)'}
              </button>
              <p className="text-xs text-blue-600 mt-2">Dùng để test tính năng nâng cấp Plus</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Họ và tên"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {(mode === 'forgot-password' || mode === 'reset-password') && (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  disabled={mode === 'reset-password'}
                />
              </div>
            )}

            {(mode === 'login' || mode === 'register') && (
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {mode === 'reset-password' && (
              <>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mật khẩu mới"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Xác nhận mật khẩu mới"
                    value={formData.confirmNewPassword}
                    onChange={(e) => setFormData({ ...formData, confirmNewPassword: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </>
            )}

            {(mode === 'login' || mode === 'register') && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mật khẩu"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            )}

            {mode === 'register' && (
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Xác nhận mật khẩu"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || emailSent}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Đang xử lý...' : (
                mode === 'login' ? 'Đăng nhập' : 
                mode === 'register' ? 'Đăng ký' : 
                mode === 'forgot-password' ? 'Gửi email khôi phục' :
                'Đặt lại mật khẩu'
              )}
            </button>
          </form>

          {mode === 'login' && (
            <div className="mt-4 text-center">
              <button
                onClick={() => onModeChange('forgot-password')}
                className="text-blue-600 hover:underline text-sm"
              >
                Quên mật khẩu?
              </button>
            </div>
          )}

          {(mode === 'login' || mode === 'register') && (
            <>
              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm">hoặc</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-3 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-gray-700">Đăng nhập với Google</span>
              </button>

              {/* Switch Mode */}
              <div className="mt-6 text-center">
                <span className="text-gray-600">
                  {mode === 'login' ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                </span>
                <button
                  onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
                  className="ml-2 text-blue-600 font-medium hover:underline"
                >
                  {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
