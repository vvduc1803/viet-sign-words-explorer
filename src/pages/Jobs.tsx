
import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Users, Filter } from 'lucide-react';

const Jobs = () => {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'Phiên dịch viên Ngôn ngữ Ký hiệu',
      company: 'Trung tâm Hỗ trợ Người khuyết tật TP.HCM',
      location: 'TP. Hồ Chí Minh',
      type: 'Toàn thời gian',
      salary: '8-12 triệu VNĐ',
      experience: '1-2 năm',
      description: 'Phiên dịch trong các cuộc họp, sự kiện và các hoạt động hỗ trợ người Điếc.',
      requirements: ['Thành thạo NNKH Việt Nam', 'Có chứng chỉ phiên dịch NNKH', 'Kỹ năng giao tiếp tốt'],
      posted: '2024-01-15',
      featured: true
    },
    {
      id: 2,
      title: 'Giáo viên Ngôn ngữ Ký hiệu',
      company: 'Trường Đặc biệt Hà Nội',
      location: 'Hà Nội',
      type: 'Toàn thời gian',
      salary: '10-15 triệu VNĐ',
      experience: '2-3 năm',
      description: 'Giảng dạy NNKH cho học sinh khuyết tật và phụ huynh.',
      requirements: ['Bằng cử nhân Sư phạm', 'Chứng chỉ NNKH', 'Kinh nghiệm giảng dạy'],
      posted: '2024-01-12'
    },
    {
      id: 3,
      title: 'Nhân viên Hỗ trợ Khách hàng (Biết NNKH)',
      company: 'Ngân hàng ABC',
      location: 'Đà Nẵng',
      type: 'Bán thời gian',
      salary: '6-8 triệu VNĐ',
      experience: 'Không yêu cầu',
      description: 'Hỗ trợ khách hàng người Điếc sử dụng dịch vụ ngân hàng.',
      requirements: ['Biết cơ bản NNKH', 'Thái độ thân thiện', 'Kỹ năng máy tính'],
      posted: '2024-01-10'
    },
    {
      id: 4,
      title: 'Chuyên viên Truyền thông NNKH',
      company: 'Tổ chức Phi lợi nhuận DEF',
      location: 'TP. Hồ Chí Minh',
      type: 'Toàn thời gian',
      salary: '12-18 triệu VNĐ',
      experience: '3-5 năm',
      description: 'Tạo nội dung truyền thông về NNKH và cộng đồng người Điếc.',
      requirements: ['Kinh nghiệm truyền thông', 'Thành thạo NNKH', 'Kỹ năng viết tốt'],
      posted: '2024-01-08'
    },
    {
      id: 5,
      title: 'Thực tập sinh NNKH',
      company: 'Viện Nghiên cứu Giáo dục',
      location: 'Hà Nội',
      type: 'Thực tập',
      salary: '3-5 triệu VNĐ',
      experience: 'Sinh viên',
      description: 'Hỗ trợ nghiên cứu và phát triển tài liệu giảng dạy NNKH.',
      requirements: ['Sinh viên năm cuối', 'Quan tâm đến NNKH', 'Thái độ học hỏi'],
      posted: '2024-01-05'
    },
    {
      id: 6,
      title: 'Huấn luyện viên NNKH cho Doanh nghiệp',
      company: 'Công ty Tư vấn GHI',
      location: 'Cần Thơ',
      type: 'Freelance',
      salary: 'Thỏa thuận',
      experience: '2+ năm',
      description: 'Đào tạo NNKH cho nhân viên doanh nghiệp.',
      requirements: ['Chứng chỉ đào tạo', 'Kinh nghiệm giảng dạy', 'Kỹ năng thuyết trình'],
      posted: '2024-01-03'
    }
  ];

  const locations = ['all', 'TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ'];
  const types = ['all', 'Toàn thời gian', 'Bán thời gian', 'Thực tập', 'Freelance'];

  const filteredJobs = jobs.filter(job => {
    const locationMatch = selectedLocation === 'all' || job.location === selectedLocation;
    const typeMatch = selectedType === 'all' || job.type === selectedType;
    return locationMatch && typeMatch;
  });

  const getTypeColor = (type) => {
    const colors = {
      'Toàn thời gian': 'bg-green-100 text-green-800',
      'Bán thời gian': 'bg-blue-100 text-blue-800',
      'Thực tập': 'bg-yellow-100 text-yellow-800',
      'Freelance': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Cơ hội Việc làm
          </h1>
          <p className="text-xl text-gray-600">
            Tìm kiếm cơ hội nghề nghiệp dành cho người biết ngôn ngữ ký hiệu
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-education-blue" />
            <h2 className="text-lg font-semibold text-gray-800">Bộ lọc</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa điểm
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-education-blue focus:border-transparent"
              >
                <option value="all">Tất cả địa điểm</option>
                {locations.filter(loc => loc !== 'all').map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Loại hình
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-education-blue focus:border-transparent"
              >
                <option value="all">Tất cả loại hình</option>
                {types.filter(type => type !== 'all').map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Users className="w-12 h-12 text-education-blue mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{jobs.length}</h3>
            <p className="text-gray-600">Vị trí đang tuyển</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <MapPin className="w-12 h-12 text-education-green mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">{locations.length - 1}</h3>
            <p className="text-gray-600">Thành phố</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <Clock className="w-12 h-12 text-education-orange mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-gray-800">50+</h3>
            <p className="text-gray-600">Ứng viên đã tuyển</p>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className={`bg-white rounded-xl shadow-lg p-6 card-hover ${job.featured ? 'border-2 border-education-blue' : ''}`}>
              {job.featured && (
                <div className="bg-education-blue text-white px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                  Nổi bật
                </div>
              )}
              
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {job.title}
                  </h3>
                  <p className="text-education-blue font-medium mb-3">
                    {job.company}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.experience}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {job.requirements.slice(0, 3).map((req, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(job.type)}`}>
                      {job.type}
                    </span>
                    <p className="text-sm text-gray-500 mt-3">
                      Đăng ngày: {new Date(job.posted).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-4">
                    <button className="btn-primary">
                      Ứng tuyển ngay
                    </button>
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                      Xem chi tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Không tìm thấy việc làm phù hợp
            </h3>
            <p className="text-gray-500">
              Thử thay đổi bộ lọc để xem nhiều cơ hội hơn
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-education-blue to-education-purple rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Bạn là nhà tuyển dụng?
          </h2>
          <p className="text-lg mb-6">
            Đăng tin tuyển dụng để tìm kiếm ứng viên có kỹ năng ngôn ngữ ký hiệu
          </p>
          <button className="px-8 py-3 bg-white text-education-blue rounded-xl font-medium hover:bg-gray-100 transition-colors duration-300">
            Đăng tin tuyển dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
