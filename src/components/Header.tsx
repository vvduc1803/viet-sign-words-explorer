import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, BookOpen, PenTool, Heart, User, LogOut, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import UpgradeModal from './UpgradeModal';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isLoggedIn, logout } = useAuth();

  const navItems = [
    { name: 'Tra cứu từ', href: '/', icon: Search },
    { name: 'Từ điển', href: '/dictionary', icon: BookOpen },
    { name: 'Ôn tập', href: '/practice', icon: PenTool },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  const handleUpgradeClick = () => {
    if (!isLoggedIn) {
      // Show login modal first
      setAuthMode('login');
      setAuthModalOpen(true);
    } else {
      setUpgradeModalOpen(true);
    }
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SL</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SignLanguage
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600 border-2 border-blue-200'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  {/* Personal Collection Button */}
                  <Link
                    to="/practice?mode=collection"
                    className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  >
                    <Heart className="w-4 h-4" />
                    <span>Bộ sưu tập</span>
                  </Link>

                  {/* Upgrade Button (only for non-premium users) */}
                  {!user?.isPremium && (
                    <button
                      onClick={handleUpgradeClick}
                      className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                    >
                      <Star className="w-4 h-4" />
                      <span>Nâng cấp Plus</span>
                    </button>
                  )}

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="w-8 h-8 bg-education-blue rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{user?.name}</span>
                      {user?.isPremium && (
                        <Star className="w-4 h-4 text-orange-500" />
                      )}
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="font-medium text-gray-800">{user?.name}</p>
                          <p className="text-sm text-gray-600">{user?.email}</p>
                          {user?.isPremium && (
                            <p className="text-xs text-orange-600 font-medium mt-1">Plus Member</p>
                          )}
                        </div>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Upgrade Button for non-logged in users */}
                  <button
                    onClick={handleUpgradeClick}
                    className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  >
                    <Star className="w-4 h-4" />
                    <span>Plus</span>
                  </button>
                  
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="text-gray-600 hover:text-education-blue font-medium transition-colors duration-200"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="bg-gradient-to-r from-education-blue to-education-purple text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors duration-200"
              >
                {isOpen ? (
                  <X className="block h-6 w-6" />
                ) : (
                  <Menu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50 border-t">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {isLoggedIn ? (
                <>
                  {/* Mobile Personal Collection */}
                  <Link
                    to="/practice?mode=collection"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Bộ sưu tập</span>
                  </Link>

                  {/* Mobile User Info */}
                  <div className="px-3 py-2 border-t border-gray-200 mt-2">
                    <p className="font-medium text-gray-800">{user?.name}</p>
                    <p className="text-sm text-gray-600">{user?.email}</p>
                    {user?.isPremium && (
                      <p className="text-xs text-orange-600 font-medium mt-1">Plus Member</p>
                    )}
                  </div>

                  {!user?.isPremium && (
                    <button
                      onClick={() => {
                        handleUpgradeClick();
                        setIsOpen(false);
                      }}
                      className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                    >
                      <Star className="w-5 h-5" />
                      <span>Nâng cấp Plus</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Đăng xuất</span>
                  </button>
                </>
              ) : (
                <>
                  {/* Mobile Upgrade Button */}
                  <button
                    onClick={() => {
                      handleUpgradeClick();
                      setIsOpen(false);
                    }}
                    className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                  >
                    <Star className="w-5 h-5" />
                    <span>Nâng cấp Plus</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      handleAuthClick('login');
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => {
                      handleAuthClick('register');
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-education-blue to-education-purple text-white"
                  >
                    Đăng ký
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        onLoginRequired={() => {
          setUpgradeModalOpen(false);
          setAuthMode('login');
          setAuthModalOpen(true);
        }}
      />

      {/* Click outside to close user menu */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setUserMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
