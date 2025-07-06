
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Search, Dumbbell, Menu, X, Crown, User, LogOut, MessageSquare, Plus, Shield, Key, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import AuthModal from './AuthModal';
import UpgradeModal from './UpgradeModal';
import FeedbackModal from './FeedbackModal';
import ContributeModal from './ContributeModal';
import ChangePasswordModal from './ChangePasswordModal';
import DonationModal from './DonationModal';

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot-password' | 'reset-password'>('login');
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Trang chủ', icon: Book },
    { to: '/dictionary', label: 'Từ điển', icon: Search },
    { to: '/practice', label: 'Ôn tập', icon: Dumbbell },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleUpgradeClick = () => {
    if (!isLoggedIn) {
      setAuthMode('login');
      setIsAuthModalOpen(true);
    } else {
      setIsUpgradeModalOpen(true);
    }
  };

  const handleAuthClick = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Book className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Từ Điển Trẻ Em</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.to)
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Admin Link - Only show for admin users */}
              {user?.isAdmin && (
                <Link
                  to="/admin"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/admin')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Quản lý</span>
                </Link>
              )}
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Personal Collection - Only show when logged in */}
              {isLoggedIn && (
                <Link
                  to="/collection"
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  <span>Bộ sưu tập</span>
                </Link>
              )}

              {/* Donation Button */}
              <Button
                onClick={() => setIsDonationModalOpen(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-200"
              >
                <Heart className="w-4 h-4 mr-2" />
                Ủng hộ dự án
              </Button>

              {/* Upgrade Button - Only show for non-premium users */}
              {(!isLoggedIn || !user?.isPremium) && (
                <Button
                  onClick={handleUpgradeClick}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-200"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Nâng cấp Plus
                </Button>
              )}

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900 flex items-center space-x-1">
                        <span>{user?.name}</span>
                        {user?.isPremium && <Crown className="w-3 h-3 text-yellow-500" />}
                      </div>
                      <div className="text-xs text-gray-600">{user?.email}</div>
                    </div>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-50">
                      <div className="px-4 py-2 border-b">
                        <div className="text-sm font-medium text-gray-900 flex items-center space-x-1">
                          <span>{user?.name}</span>
                          {user?.isPremium && <Crown className="w-3 h-3 text-yellow-500" />}
                        </div>
                        <div className="text-xs text-gray-600">{user?.email}</div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setIsChangePasswordModalOpen(true);
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                      >
                        <Key className="w-4 h-4" />
                        <span>Đổi mật khẩu</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setIsFeedbackModalOpen(true);
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Góp ý</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setIsContributeModalOpen(true);
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Đóng góp dữ liệu</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  onClick={handleAuthClick}
                  variant="outline"
                >
                  Đăng nhập
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t py-4">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive(item.to)
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
                
                {/* Admin Link - Mobile */}
                {user?.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive('/admin')
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Quản lý</span>
                  </Link>
                )}

                {/* Personal Collection - Mobile */}
                {isLoggedIn && (
                  <Link
                    to="/collection"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Bộ sưu tập</span>
                  </Link>
                )}
              </nav>
              
              <div className="mt-4 pt-4 border-t space-y-2">
                {/* Donation Button - Mobile */}
                <Button
                  onClick={() => {
                    setIsDonationModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Ủng hộ dự án
                </Button>

                {/* Upgrade Button - Mobile - Only show for non-premium users */}
                {(!isLoggedIn || !user?.isPremium) && (
                  <Button
                    onClick={() => {
                      handleUpgradeClick();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-medium"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Nâng cấp Plus
                  </Button>
                )}
                
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900 flex items-center space-x-1">
                        <span>{user?.name}</span>
                        {user?.isPremium && <Crown className="w-3 h-3 text-yellow-500" />}
                      </div>
                      <div className="text-xs text-gray-600">{user?.email}</div>
                    </div>
                    
                    <button
                      onClick={() => {
                        setIsChangePasswordModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Key className="w-4 h-4" />
                      <span>Đổi mật khẩu</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsFeedbackModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Góp ý</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setIsContributeModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Đóng góp dữ liệu</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      handleAuthClick();
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Đăng nhập
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
      />
      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
      <ContributeModal 
        isOpen={isContributeModalOpen} 
        onClose={() => setIsContributeModalOpen(false)} 
      />
      <ChangePasswordModal 
        isOpen={isChangePasswordModalOpen} 
        onClose={() => setIsChangePasswordModalOpen(false)} 
      />
      <DonationModal 
        isOpen={isDonationModalOpen} 
        onClose={() => setIsDonationModalOpen(false)} 
      />
    </>
  );
};

export default Header;
