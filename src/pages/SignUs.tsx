
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, BookOpen, Video } from 'lucide-react';

const SignUs = () => {
  const features = [
    {
      icon: Heart,
      title: 'Kết nối cảm xúc',
      description: 'Mỗi ký hiệu mang trong mình một cảm xúc, một câu chuyện riêng'
    },
    {
      icon: Users,
      title: 'Xây dựng cộng đồng',
      description: 'Tạo ra không gian giao lưu, học hỏi giữa người Nghe và người Điếc'
    },
    {
      icon: BookOpen,
      title: 'Học tập dễ dàng',
      description: 'Cung cấp công cụ học ngôn ngữ ký hiệu hiệu quả và thú vị'
    },
    {
      icon: Video,
      title: 'Nội dung đa dạng',
      description: 'Video, hình ảnh và bài tập phong phú để học tập'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-education-blue to-education-purple text-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            SignUs
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Một Ký hiệu, Triệu Kết nối
          </p>
          <p className="text-lg mb-12 max-w-4xl mx-auto leading-relaxed">
            Chiến dịch truyền thông nhằm mục đích gắn kết cộng đồng người Nghe và người Điếc
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/learn-sign-language" className="px-8 py-4 bg-white text-education-blue rounded-xl font-medium hover:bg-gray-100 transition-colors duration-300">
              Bắt đầu học
            </Link>
            <Link to="/dictionary" className="px-8 py-4 border-2 border-white text-white rounded-xl font-medium hover:bg-white hover:text-education-blue transition-colors duration-300">
              Khám phá từ điển
            </Link>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Sứ mệnh của chúng tôi
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              SignUs tin tưởng vào sức mạnh của mỗi ký hiệu trong việc xây dựng cầu nối hiểu biết và sẻ chia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center card-hover">
                  <div className="w-16 h-16 bg-gradient-to-r from-education-blue to-education-purple rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-100 to-blue-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Cùng tham gia SignUs
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            SignUs kêu gọi mọi người cùng tham gia để tạo nên một cộng đồng hòa nhập, 
            nơi mọi rào cản giao tiếp đều được xóa bỏ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/feedback" className="btn-primary">
              Góp ý & Tham gia
            </Link>
            <Link to="/blog" className="px-6 py-3 border-2 border-education-blue text-education-blue rounded-xl font-medium hover:bg-education-blue hover:text-white transition-colors duration-300">
              Đọc câu chuyện
            </Link>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Video giới thiệu SignUs
          </h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Video giới thiệu SignUs</p>
                <p className="text-sm text-gray-400 mt-2">
                  (Video sẽ được cập nhật sau)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUs;
