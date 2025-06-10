
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, BookOpen, Users, Heart } from 'lucide-react';

const Home = () => {
  const [mascotPosition, setMascotPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate mascot position based on scroll percentage
      const scrollPercentage = scrollY / (documentHeight - windowHeight);
      setMascotPosition(scrollPercentage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jobPositions = [
    "Phiên dịch viên NNKH",
    "Giáo viên NNKH", 
    "Nhân viên hỗ trợ người Điếc",
    "Chuyên viên truyền thông NNKH"
  ];

  const blogPosts = [
    {
      title: "Thông tin về thủ ngữ",
      description: "Tìm hiểu về các thủ ngữ cơ bản trong ngôn ngữ ký hiệu",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop"
    },
    {
      title: "Câu chuyện truyền cảm hứng",
      description: "Những câu chuyện đầy cảm hứng từ cộng đồng người Điếc",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
      {/* Mascot */}
      <div 
        className="fixed left-8 z-30 transition-all duration-300 ease-out hidden lg:block"
        style={{
          top: `${20 + mascotPosition * 60}%`,
          transform: `translateY(-50%) rotate(${mascotPosition * 10}deg)`
        }}
      >
        <div className="w-20 h-20 bg-gradient-to-r from-education-blue to-education-purple rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <span className="text-white text-2xl">🤝</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
            SignUs
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Một Ký hiệu, Triệu Kết nối
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dictionary" className="btn-primary">
              Khám phá từ điển
            </Link>
            <Link to="/practice" className="px-6 py-3 border-2 border-education-blue text-education-blue rounded-xl font-medium hover:bg-education-blue hover:text-white transition-all duration-300">
              Bắt đầu học
            </Link>
          </div>
        </div>
      </section>

      {/* Ngôn ngữ Ký hiệu Section */}
      <section className="py-16 px-4" id="sign-language">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 card-hover">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Ngôn ngữ Ký hiệu
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Ngôn ngữ ký hiệu là cách cực chất để 'nói chuyện' chỉ bằng tay, nét mặt và cả dáng người mình nữa đó! 
                  Đây là ngôn ngữ siêu quan trọng giúp cộng đồng người Điếc và mọi người kết nối, hiểu nhau thật dễ dàng!
                </p>
                <Link to="/about-sign-language" className="inline-flex items-center px-6 py-3 bg-education-green text-white rounded-xl font-medium hover:bg-green-600 transition-colors duration-300">
                  Tìm hiểu thêm
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop" 
                  alt="Ngôn ngữ ký hiệu"
                  className="rounded-xl shadow-lg w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chuyện người Điếc Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-100 to-pink-100" id="deaf-stories">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 card-hover">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1 relative">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop" 
                  alt="Cộng đồng người Điếc"
                  className="rounded-xl shadow-lg w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Chuyện người Điếc
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Người Điếc là một cộng đồng sống động lắm nha, có ngôn ngữ riêng là ngôn ngữ ký hiệu 'tay chạm tay' siêu độc đáo luôn! 
                  Họ sở hữu một nét văn hóa rất riêng và luôn kết nối, sẻ chia theo cách riêng đầy ý nghĩa của mình đó!
                </p>
                <Link to="/blog?category=deaf-stories" className="inline-flex items-center px-6 py-3 bg-education-purple text-white rounded-xl font-medium hover:bg-purple-600 transition-colors duration-300">
                  Tìm hiểu thêm
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SignUs Section */}
      <section className="py-16 px-4" id="signus">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-education-blue to-education-purple rounded-2xl shadow-xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              SignUs
            </h2>
            <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-4xl mx-auto">
              Chiến dịch truyền thông nhằm mục đích gắn kết cộng đồng người Nghe và người Điếc. 
              Dự án thực hiện mục tiêu này bằng cách khuyến khích việc học hỏi và sử dụng ngôn ngữ ký hiệu. 
              Với Big Idea "một ký hiệu triệu kết nối", SignUs tin tưởng vào sức mạnh của mỗi ký hiệu trong việc xây dựng cầu nối hiểu biết và sẻ chia. 
              SignUs kêu gọi mọi người cùng tham gia để tạo nên một cộng đồng hòa nhập, nơi mọi rào cản giao tiếp đều được xóa bỏ.
            </p>
            <Link to="/signus" className="inline-flex items-center px-8 py-4 bg-white text-education-blue rounded-xl font-medium hover:bg-gray-100 transition-colors duration-300">
              Tham gia SignUs
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Giới thiệu Việc làm Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-100 to-blue-100" id="jobs">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Cơ hội Việc làm
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobPositions.map((position, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 card-hover text-center">
                <Briefcase className="w-12 h-12 text-education-blue mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {position}
                </h3>
                <Link to="/jobs" className="inline-flex items-center text-education-blue font-medium hover:text-blue-600 transition-colors duration-300">
                  Xem thêm
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/jobs" className="btn-primary">
              Xem tất cả việc làm
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-4" id="blog">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Blog nổi bật
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {post.description}
                  </p>
                  <Link to="/blog" className="inline-flex items-center text-education-blue font-medium hover:text-blue-600 transition-colors duration-300">
                    Đọc thêm
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/blog" className="btn-primary">
              Xem tất cả bài viết
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
