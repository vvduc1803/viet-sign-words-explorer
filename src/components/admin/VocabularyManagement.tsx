
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, BookOpen, Upload, X, Search } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface VocabularyData {
  id: string;
  word: string;
  categories: string[]; // Changed from category/subcategory to array of categories
  description?: string;
  hasImage: boolean;
  hasVideo: boolean;
  hasSignVideo: boolean;
}

const VocabularyManagement = () => {
  const [vocabularyList, setVocabularyList] = useState<VocabularyData[]>([
    {
      id: '1',
      word: 'con gà',
      categories: ['Động vật', 'Gia cầm', 'Chim'],
      description: 'Loài chim nhà được nuôi để lấy thịt và trứng',
      hasImage: true,
      hasVideo: true,
      hasSignVideo: true
    },
    {
      id: '2',
      word: 'bố',
      categories: ['Gia đình', 'Thành viên', 'Cha mẹ'],
      description: 'Người cha trong gia đình',
      hasImage: true,
      hasVideo: false,
      hasSignVideo: true
    },
    {
      id: '3',
      word: 'quả táo',
      categories: ['Thực phẩm', 'Trái cây', 'Trái cây có múi', 'Vitamin C', 'Tươi'],
      description: 'Trái cây màu đỏ hoặc xanh giàu vitamin',
      hasImage: true,
      hasVideo: true,
      hasSignVideo: true
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingWord, setEditingWord] = useState<VocabularyData | null>(null);
  const [formData, setFormData] = useState({
    word: '',
    categories: [''],
    description: '',
    imageFile: null as File | null,
    videoFile: null as File | null,
    signVideoFile: null as File | null
  });

  // Filter vocabulary based on search term
  const filteredVocabulary = useMemo(() => {
    if (!searchTerm.trim()) return vocabularyList;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return vocabularyList.filter(item => 
      item.word.toLowerCase().includes(lowerSearchTerm) ||
      item.categories.some(cat => cat.toLowerCase().includes(lowerSearchTerm)) ||
      (item.description && item.description.toLowerCase().includes(lowerSearchTerm))
    );
  }, [vocabularyList, searchTerm]);

  const handleEdit = (word: VocabularyData) => {
    setEditingWord(word);
    setFormData({
      word: word.word,
      categories: [...word.categories],
      description: word.description || '',
      imageFile: null,
      videoFile: null,
      signVideoFile: null
    });
    setIsEditing(true);
  };

  const handleDelete = (wordId: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa từ này?')) {
      setVocabularyList(prev => prev.filter(w => w.id !== wordId));
    }
  };

  const handleSave = () => {
    const filteredCategories = formData.categories.filter(cat => cat.trim() !== '');
    
    if (editingWord) {
      // Update existing word
      setVocabularyList(prev => prev.map(w => 
        w.id === editingWord.id 
          ? {
              ...w,
              word: formData.word,
              categories: filteredCategories,
              description: formData.description,
              hasImage: formData.imageFile ? true : w.hasImage,
              hasVideo: formData.videoFile ? true : w.hasVideo,
              hasSignVideo: formData.signVideoFile ? true : w.hasSignVideo
            }
          : w
      ));
    } else {
      // Add new word
      const newWord: VocabularyData = {
        id: Date.now().toString(),
        word: formData.word,
        categories: filteredCategories,
        description: formData.description,
        hasImage: !!formData.imageFile,
        hasVideo: !!formData.videoFile,
        hasSignVideo: !!formData.signVideoFile
      };
      setVocabularyList(prev => [...prev, newWord]);
    }
    
    handleCancel();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingWord(null);
    setFormData({
      word: '',
      categories: [''],
      description: '',
      imageFile: null,
      videoFile: null,
      signVideoFile: null
    });
  };

  const handleFileSelect = (type: 'image' | 'video' | 'sign', file: File) => {
    setFormData(prev => ({
      ...prev,
      [`${type}File`]: file
    }));
  };

  const removeFile = (type: 'image' | 'video' | 'sign') => {
    setFormData(prev => ({
      ...prev,
      [`${type}File`]: null
    }));
  };

  const addCategory = () => {
    setFormData(prev => ({
      ...prev,
      categories: [...prev.categories, '']
    }));
  };

  const removeCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }));
  };

  const updateCategory = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.map((cat, i) => i === index ? value : cat)
    }));
  };

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>{editingWord ? 'Chỉnh sửa từ vựng' : 'Thêm từ vựng mới'}</span>
            </div>
            <Button variant="outline" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Hủy
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Từ vựng *
                </label>
                <Input
                  type="text"
                  value={formData.word}
                  onChange={(e) => setFormData(prev => ({ ...prev, word: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Categories Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Danh mục phân cấp *
                </label>
                <Button type="button" onClick={addCategory} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Thêm cấp
                </Button>
              </div>
              <div className="space-y-2">
                {formData.categories.map((category, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 min-w-[60px]">
                      Cấp {index + 1}:
                    </span>
                    <Input
                      type="text"
                      value={category}
                      onChange={(e) => updateCategory(index, e.target.value)}
                      placeholder={`Danh mục cấp ${index + 1}`}
                      className="flex-1"
                      required={index === 0}
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => removeCategory(index)}
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Ví dụ: Cấp 1: "Động vật", Cấp 2: "Gia cầm", Cấp 3: "Chim"...
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả/Định nghĩa
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Giải thích nghĩa của từ..."
                className="min-h-[80px]"
              />
            </div>

            {/* File uploads */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Tài liệu đính kèm</h3>
              
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh</label>
                {!formData.imageFile ? (
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
                    <span className="text-sm text-gray-700">{formData.imageFile.name}</span>
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Video minh họa</label>
                {!formData.videoFile ? (
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
                        <p className="text-sm text-gray-600">Chọn video</p>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg">
                    <span className="text-sm text-gray-700">{formData.videoFile.name}</span>
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

              {/* Sign Video Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Video ngôn ngữ ký hiệu</label>
                {!formData.signVideoFile ? (
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
                    <span className="text-sm text-gray-700">{formData.signVideoFile.name}</span>
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

            <div className="flex space-x-3 pt-4">
              <Button type="submit" className="flex-1">
                {editingWord ? 'Cập nhật' : 'Thêm từ'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>Quản lý từ vựng</span>
          </div>
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Thêm từ mới
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Tìm kiếm từ vựng, danh mục hoặc mô tả..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Results count */}
        <div className="text-sm text-gray-600">
          Hiển thị {filteredVocabulary.length} / {vocabularyList.length} từ vựng
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Từ vựng</TableHead>
              <TableHead>Danh mục phân cấp</TableHead>
              <TableHead>Tài liệu</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVocabulary.map((word) => (
              <TableRow key={word.id}>
                <TableCell className="font-medium">{word.word}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {word.categories.map((category, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {index + 1}. {category}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    {word.hasImage && <Badge variant="secondary">Ảnh</Badge>}
                    {word.hasVideo && <Badge variant="secondary">Video</Badge>}
                    {word.hasSignVideo && <Badge variant="secondary">Ký hiệu</Badge>}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(word)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(word.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredVocabulary.length === 0 && searchTerm && (
          <div className="text-center py-8 text-gray-500">
            Không tìm thấy từ vựng nào phù hợp với "{searchTerm}"
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VocabularyManagement;
