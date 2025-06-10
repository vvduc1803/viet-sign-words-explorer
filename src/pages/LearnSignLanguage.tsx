
import React from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, Users, Trophy } from 'lucide-react';

const LearnSignLanguage = () => {
  const lessons = [
    {
      id: 1,
      title: 'Bảng chữ cái NNKH',
      description: 'Học các ký hiệu cơ bản của bảng chữ cái',
      duration: '15 phút',
      level: 'Cơ bản',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Số đếm và thời gian',
      description: 'Học cách biểu diễn số và thời gian bằng ký hiệu',
      duration: '20 phút',
      level: 'Cơ bản',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Gia đình và người thân',
      description: 'Từ vựng về các thành viên trong gia đình',
      duration: '25 phút',
      level: 'Cơ bản',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop'
    },
    {
      id: 4,
      title: 'Động vật quen thuộc',
      description: 'Học ký hiệu của các loài động vật thường gặp',
      duration: '30 phút',
      level: 'Trung bình',
      image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=200&fit=crop'
    },
    {
      id: 5,
      title: 'Cảm xúc và tâm trạng',
      description: 'Biểu hiện cảm xúc qua ngôn ngữ ký hiệu',
      duration: '20 phút',
      level: 'Trung bình',
      image: 'https://images.unsplash.com/photo-1501286353178-1ec881214838?w=400&h=200&fit=crop'
    },
    {
      id: 6,
      title: 'Hội thoại cơ bản',
      description: 'Thực hành các cuộc hội thoại đơn giản',
      duration: '35 phút',
      level: 'Nâng cao',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop'
    }
  ];

  const phrases = [
    { vietnamese: 'Xin chào', description: 'Lời chào hàng ngày' },
    { vietnamese: 'Cảm ơn', description: 'Lời cảm ơn' },
    { vietnamese: 'Xin lỗi', description: 'Lời xin lỗi' },
    { vietnamese: 'Tôi tên là...', description: 'Giới thiệu bản thân' },
    { vietnamese: 'Bạn khỏe không?', description: 'Hỏi thăm sức khỏe' },
    { vietnamese: 'Tạm biệt', description: 'Lời chào tạm biệt' }
  ];

  const getLevelColor = (level) => {
    switch (level) {
      case 'Cơ bản': return 'bg-green-100 text-green-800';
      case 'Trung bình': return 'bg-yellow-100 text-yellow-800';
      case 'Nâng cao': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Học Ngôn ngữ Ký hiệu
          </h1>
          <p className="text-xl text-gray-600">
            Bắt đầu hành trình học ngôn ngữ ký hiệu từ cơ bản đến nâng cao
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <BookOpen className="w-12 h-12 text-education-blue mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{lessons.length}</h3>
            <p className="text-gray-600">Bài học</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Users className="w-12 h-12 text-education-green mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">1,000+</h3>
            <p className="text-gray-600">Học viên</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Trophy className="w-12 h-12 text-education-orange mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">95%</h3>
            <p className="text-gray-600">Hoàn thành</p>
          </div>
        </div>

        {/* Lessons */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Các bài học
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <img 
                  src={lesson.image} 
                  alt={lesson.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(lesson.level)}`}>
                      {lesson.level}
                    </span>
                    <span className="text-sm text-gray-500">{lesson.duration}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {lesson.description}
                  </p>
                  <Link 
                    to="/practice" 
                    className="inline-flex items-center px-4 py-2 bg-education-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors duration-300"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Học ngay
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Common Phrases */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Cụm từ thông dụng
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {phrases.map((phrase, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-education-blue transition-colors duration-300">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {phrase.vietnamese}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {phrase.description}
                </p>
                <Link 
                  to={`/?search=${encodeURIComponent(phrase.vietnamese)}`}
                  className="text-education-blue font-medium hover:text-blue-600 transition-colors duration-300"
                >
                  Xem ký hiệu →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnSignLanguage;
