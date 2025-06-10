
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, BookOpen, Menu, X } from 'lucide-react';
import { searchWord } from '../data/vocabulary';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const result = searchWord(searchQuery);
      if (result) {
        navigate(`/?search=${encodeURIComponent(searchQuery)}`);
      } else {
        navigate(`/?search=${encodeURIComponent(searchQuery)}&notfound=true`);
      }
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const navItems = [
    { path: '/', label: 'Trang chủ', icon: BookOpen },
    { path: '/about-sign-language', label: 'Về NNKH', icon: BookOpen },
    { path: '/signus', label: 'SignUs', icon: BookOpen },
    { path: '/learn-sign-language', label: 'Học NNKH', icon: BookOpen },
    { path: '/blog', label: 'Blog', icon: BookOpen },
    { path: '/feedback', label: 'Hỏi đáp & Góp ý', icon: BookOpen }
  ];

  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-education-blue to-education-purple rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">S</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              SignUs
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg transition-all duration-300 font-medium ${
                    isActive
                      ? 'bg-education-blue text-white'
                      : 'text-gray-600 hover:text-education-blue hover:bg-blue-50'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Tìm kiếm từ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-48 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-education-blue focus:border-transparent transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-education-blue text-white rounded-xl hover:bg-blue-600 transition-colors duration-300"
            >
              Tìm
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                      isActive
                        ? 'bg-education-blue text-white'
                        : 'text-gray-600 hover:text-education-blue hover:bg-blue-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            
            {/* Mobile Search */}
            <div className="mt-4 px-4">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Tìm kiếm từ..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-education-blue focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                <button
                  onClick={() => {
                    handleSearch();
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-education-blue text-white rounded-xl hover:bg-blue-600 transition-colors duration-300"
                >
                  Tìm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
