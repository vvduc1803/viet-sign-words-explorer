
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';

const Blog = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { id: 'sign-language', name: 'Thông tin về thủ ngữ' },
    { id: 'inspiration', name: 'Câu chuyện truyền cảm hứng' },
    { id: 'news', name: 'Tin tức & Sự kiện' },
    { id: 'deaf-community', name: 'Người Điếc truyền cảm hứng' },
    { id: 'deaf-stories', name: 'Chuyện người Điếc' }
  ];

  const posts = [
    {
      id: 1,
      title: 'Bảng chữ cái ngôn ngữ ký hiệu Việt Nam',
      excerpt: 'Tìm hiểu về 26 ký hiệu cơ bản của bảng chữ cái trong ngôn ngữ ký hiệu Việt Nam',
      category: 'sign-language',
      author: 'Nguyễn Văn A',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'Câu chuyện về em Minh - học sinh điếc xuất sắc',
      excerpt: 'Hành trình vượt qua khó khăn của em Minh để trở thành học sinh giỏi',
      category: 'inspiration',
      author: 'Trần Thị B',
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Ngày Quốc tế Người khuyết tật 2024',
      excerpt: 'Các hoạt động và sự kiện nhân Ngày Quốc tế Người khuyết tật',
      category: 'news',
      author: 'Lê Văn C',
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Chị Hương - Phiên dịch viên NNKH tài năng',
      excerpt: 'Câu chuyện về chị Hương và hành trình trở thành phiên dịch viên chuyên nghiệp',
      category: 'deaf-community',
      author: 'Phạm Thị D',
      date: '2024-01-01',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'Văn hóa và truyền thống của cộng đồng người Điếc',
      excerpt: 'Khám phá những nét văn hóa độc đáo của cộng đồng người Điếc Việt Nam',
      category: 'deaf-stories',
      author: 'Hoàng Văn E',
      date: '2023-12-28',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop'
    },
    {
      id: 6,
      title: 'Từ vựng NNKH về thực phẩm và đồ uống',
      excerpt: 'Học các ký hiệu về thực phẩm và đồ uống trong cuộc sống hàng ngày',
      category: 'sign-language',
      author: 'Đặng Thị F',
      date: '2023-12-25',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=200&fit=crop'
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const featuredPost = posts.find(post => post.featured);

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getCategoryColor = (categoryId) => {
    const colors = {
      'sign-language': 'bg-blue-100 text-blue-800',
      'inspiration': 'bg-green-100 text-green-800',
      'news': 'bg-purple-100 text-purple-800',
      'deaf-community': 'bg-orange-100 text-orange-800',
      'deaf-stories': 'bg-pink-100 text-pink-800'
    };
    return colors[categoryId] || 'bg-gray-100 text-gray-800';
  };

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Blog SignUs
          </h1>
          <p className="text-xl text-gray-600">
            Chia sẻ kiến thức và câu chuyện về ngôn ngữ ký hiệu
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                selectedCategory === category.id
                  ? 'bg-education-blue text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {selectedCategory === 'all' && featuredPost && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
            <div className="grid md:grid-cols-2 gap-0">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(featuredPost.category)}`}>
                    {getCategoryName(featuredPost.category)}
                  </span>
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Nổi bật
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.date).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                <button className="btn-primary">
                  Đọc thêm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.filter(post => !post.featured || selectedCategory !== 'all').map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                    {getCategoryName(post.category)}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                <button className="text-education-blue font-medium hover:text-blue-600 transition-colors duration-300">
                  Đọc thêm →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Không có bài viết nào trong danh mục này.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
