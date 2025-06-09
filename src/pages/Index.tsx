
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { searchWord, VocabularyItem } from '../data/vocabulary';
import VideoPlayer from '../components/VideoPlayer';

const Index = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<VocabularyItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState('');
  const [selectedText, setSelectedText] = useState('');

  // Handle URL search parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    const notFound = urlParams.get('notfound');

    if (searchParam) {
      setSearchQuery(searchParam);
      if (notFound) {
        setError(`Không tìm thấy từ "${searchParam}"`);
        setSearchResult(null);
      } else {
        handleSearchWord(searchParam);
      }
    }
  }, [location.search]);

  const handleSearchWord = (query: string) => {
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      const result = searchWord(query);
      if (result) {
        setSearchResult(result);
        setError('');
      } else {
        setSearchResult(null);
        setError(`Không tìm thấy từ "${query}"`);
      }
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      handleSearchWord(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!allowedTypes.includes(file.type)) {
      setError('Chỉ hỗ trợ file PDF, DOC, DOCX hoặc TXT');
      return;
    }

    setSelectedFile(file);
    setError('');

    // Simulate file reading (in real app, use appropriate libraries)
    if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileContent(content);
      };
      reader.readAsText(file);
    } else {
      // For demo purposes, show sample content
      setFileContent(`Đây là nội dung mẫu từ file ${file.name}. 

Trong đoạn văn này có nhiều từ như: con gà, con chó, con mèo, bố, mẹ, cây hoa, cây táo.

Bạn có thể bôi đen (highlight) bất kỳ từ nào để xem hình ảnh và video minh họa tương ứng.

Ví dụ: Hôm nay tôi thấy con gà đi kiếm ăn trong vườn. Mẹ tôi đang tưới cây hoa ở sân.`);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim();
    if (selectedText) {
      setSelectedText(selectedText);
      handleSearchWord(selectedText);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Tra cứu Từ tiếng Việt
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-2">
            và Ngôn ngữ Ký hiệu
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Tìm hiểu ý nghĩa của từ thông qua hình ảnh và video minh họa
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Nhập từ cần tra cứu (ví dụ: con gà, bố, cây hoa)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="input-field pr-12"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="btn-primary min-w-[120px] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
              ) : (
                'Tìm kiếm'
              )}
            </button>
          </div>

          {/* File Upload Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-education-blue" />
              Tải lên tài liệu
            </h3>
            <div className="relative">
              <input
                type="file"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-education-blue hover:bg-blue-50 transition-all duration-300"
              >
                <div className="text-center">
                  <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    {selectedFile ? selectedFile.name : 'Chọn file PDF, DOC, DOCX hoặc kéo thả vào đây'}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Hỗ trợ PDF, DOC, DOCX, TXT
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8 flex items-center animate-slide-up">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Search Results */}
        {searchResult && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-bounce-in">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">
                Kết quả: "{searchResult.word}"
              </h3>
              <span className="ml-4 px-3 py-1 bg-education-blue text-white rounded-full text-sm">
                {searchResult.theme}
              </span>
            </div>

            {searchResult.description && (
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {searchResult.description}
              </p>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Image */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <div className="w-3 h-3 bg-education-green rounded-full mr-2"></div>
                  Hình ảnh minh họa
                </h4>
                <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden card-hover">
                  <img
                    src={searchResult.image}
                    alt={searchResult.word}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Video Demo */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <div className="w-3 h-3 bg-education-orange rounded-full mr-2"></div>
                  Video minh họa
                </h4>
                <VideoPlayer
                  src={searchResult.video}
                  title={`Video minh họa: ${searchResult.word}`}
                  className="aspect-square"
                />
              </div>

              {/* Sign Language Video */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <div className="w-3 h-3 bg-education-purple rounded-full mr-2"></div>
                  Video ngôn ngữ ký hiệu
                </h4>
                <VideoPlayer
                  src={searchResult.sign_language_video}
                  title={`Ngôn ngữ ký hiệu: ${searchResult.word}`}
                  className="aspect-square"
                />
              </div>
            </div>
          </div>
        )}

        {/* File Content Display */}
        {fileContent && (
          <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-education-blue" />
              Nội dung tài liệu
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Bôi đen (highlight) bất kỳ từ nào trong văn bản để xem hình ảnh và video minh họa
            </p>
            <div 
              className="bg-gray-50 rounded-xl p-6 leading-relaxed text-gray-800 select-text cursor-text"
              onMouseUp={handleTextSelection}
            >
              {fileContent.split('\n').map((line, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {line}
                </p>
              ))}
            </div>
            {selectedText && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-education-blue font-medium">
                  Từ được chọn: "{selectedText}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* Quick Tips */}
        <div className="bg-gradient-to-r from-education-blue to-education-purple rounded-2xl p-8 text-white mt-12">
          <h3 className="text-xl font-semibold mb-4">💡 Mẹo sử dụng</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">🔍 Tìm kiếm</h4>
              <p className="text-blue-100">
                Nhập từ tiếng Việt để xem hình ảnh, video minh họa và video ngôn ngữ ký hiệu
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">📄 Tải file</h4>
              <p className="text-blue-100">
                Tải lên tài liệu và bôi đen từ bất kỳ để tra cứu nhanh
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
