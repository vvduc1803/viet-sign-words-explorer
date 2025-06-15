
import React, { useState } from 'react';
import { X, Plus, Upload, Send, BookOpen } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContributeModal: React.FC<ContributeModalProps> = ({ isOpen, onClose }) => {
  const [word, setWord] = useState('');
  const [description, setDescription] = useState('');
  const [theme, setTheme] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [signVideoFile, setSignVideoFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFileSelect = (type: 'image' | 'video' | 'sign', file: File) => {
    switch (type) {
      case 'image':
        setImageFile(file);
        break;
      case 'video':
        setVideoFile(file);
        break;
      case 'sign':
        setSignVideoFile(file);
        break;
    }
  };

  const removeFile = (type: 'image' | 'video' | 'sign') => {
    switch (type) {
      case 'image':
        setImageFile(null);
        break;
      case 'video':
        setVideoFile(null);
        break;
      case 'sign':
        setSignVideoFile(null);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Cảm ơn bạn đã đóng góp! Dữ liệu sẽ được xem xét và thêm vào từ điển nếu phù hợp.');
      setWord('');
      setDescription('');
      setTheme('');
      setImageFile(null);
      setVideoFile(null);
      setSignVideoFile(null);
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Đóng góp dữ liệu</h2>
                <p className="text-sm text-gray-600">Thêm từ mới hoặc cải thiện từ hiện có</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Word Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Từ cần thêm/sửa *
                </label>
                <input
                  type="text"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  placeholder="Ví dụ: con gà, bố, cây hoa..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chủ đề
                </label>
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="Ví dụ: Động vật, Gia đình..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả/Nghĩa của từ
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Giải thích nghĩa của từ..."
                className="min-h-[80px]"
              />
            </div>

            {/* File Uploads */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Tài liệu đính kèm</h3>
              
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hình ảnh minh họa
                </label>
                {!imageFile ? (
                  <div className="relative">
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect('image', file);
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="image-upload"
                      className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                        <p className="text-sm text-gray-600">Chọn hình ảnh</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-700">{imageFile.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile('image')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Video Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video minh họa
                </label>
                {!videoFile ? (
                  <div className="relative">
                    <input
                      type="file"
                      id="video-upload"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect('video', file);
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="video-upload"
                      className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                        <p className="text-sm text-gray-600">Chọn video minh họa</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-700">{videoFile.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile('video')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Sign Language Video Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video ngôn ngữ ký hiệu
                </label>
                {!signVideoFile ? (
                  <div className="relative">
                    <input
                      type="file"
                      id="sign-video-upload"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileSelect('sign', file);
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="sign-video-upload"
                      className="flex items-center justify-center w-full h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors"
                    >
                      <div className="text-center">
                        <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                        <p className="text-sm text-gray-600">Chọn video ký hiệu</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-700">{signVideoFile.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile('sign')}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={!word.trim() || isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Đang gửi...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Gửi đóng góp</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContributeModal;
