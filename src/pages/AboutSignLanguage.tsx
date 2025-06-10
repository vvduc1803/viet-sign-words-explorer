
import React, { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const AboutSignLanguage = () => {
  const [activeTab, setActiveTab] = useState('definition');

  const tabs = [
    { id: 'definition', label: 'Định nghĩa người Điếc' },
    { id: 'history', label: 'Lịch sử NNKH' },
    { id: 'importance', label: 'Tầm quan trọng' },
    { id: 'levels', label: 'Các cấp độ điếc' },
    { id: 'types', label: 'Thể loại NNKH' },
    { id: 'difference', label: 'Phân biệt' }
  ];

  const content = {
    definition: {
      title: 'Định nghĩa người Điếc',
      content: 'Người Điếc là những người có khiếm khuyết về thính giác từ mức độ nhẹ đến hoàn toàn. Họ sử dụng ngôn ngữ ký hiệu như ngôn ngữ chính để giao tiếp và có văn hóa cộng đồng riêng biệt.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop'
    },
    history: {
      title: 'Lịch sử Ngôn ngữ Ký hiệu',
      content: 'Ngôn ngữ ký hiệu có lịch sử lâu đời và phát triển tự nhiên trong cộng đồng người Điếc. Tại Việt Nam, ngôn ngữ ký hiệu Việt Nam (VSL) được phát triển và chuẩn hóa để phục vụ giáo dục và giao tiếp.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop'
    },
    importance: {
      title: 'Tầm quan trọng của Ngôn ngữ Ký hiệu',
      content: 'Ngôn ngữ ký hiệu không chỉ là công cụ giao tiếp mà còn là nền tảng văn hóa của cộng đồng người Điếc. Nó giúp xây dựng bản sắc cá nhân và kết nối cộng đồng.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop'
    },
    levels: {
      title: 'Các cấp độ điếc',
      content: 'Có nhiều mức độ khiếm thính khác nhau: điếc nhẹ, điếc vừa, điếc nặng và điếc hoàn toàn. Mỗi mức độ đòi hỏi các phương pháp hỗ trợ và giao tiếp khác nhau.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop'
    },
    types: {
      title: 'Các thể loại Ngôn ngữ Ký hiệu',
      content: 'Có nhiều hệ thống ký hiệu khác nhau như ngôn ngữ ký hiệu tự nhiên, hệ thống ký hiệu theo tiếng nói, và fingerspelling. Mỗi loại có ứng dụng riêng.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop'
    },
    difference: {
      title: 'Phân biệt người Điếc với người khiếm thính',
      content: 'Người Điếc (D lớn) thuộc cộng đồng văn hóa Điếc, sử dụng ngôn ngữ ký hiệu. Người khiếm thính (d nhỏ) chỉ đơn thuần có vấn đề về thính giác, có thể không sử dụng ngôn ngữ ký hiệu.',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&h=400&fit=crop'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Về Ngôn ngữ Ký hiệu
          </h1>
          <p className="text-xl text-gray-600">
            Tìm hiểu về ngôn ngữ ký hiệu và cộng đồng người Điếc
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'bg-education-blue text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {content[activeTab].title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {content[activeTab].content}
              </p>
            </div>
            <div>
              <img
                src={content[activeTab].image}
                alt={content[activeTab].title}
                className="rounded-xl shadow-lg w-full"
              />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Câu hỏi thường gặp
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Ngôn ngữ ký hiệu có phải là ngôn ngữ quốc tế?</AccordionTrigger>
              <AccordionContent>
                Không, mỗi quốc gia có ngôn ngữ ký hiệu riêng. Việt Nam có Ngôn ngữ Ký hiệu Việt Nam (VSL).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Học ngôn ngữ ký hiệu có khó không?</AccordionTrigger>
              <AccordionContent>
                Như học bất kỳ ngôn ngữ nào, cần thời gian và luyện tập. Tuy nhiên, với động lực và phương pháp phù hợp, ai cũng có thể học được.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Người Điếc có thể đọc môi không?</AccordionTrigger>
              <AccordionContent>
                Một số người Điếc có thể đọc môi, nhưng đây không phải phương pháp giao tiếp chính xác 100%. Ngôn ngữ ký hiệu vẫn là phương thức giao tiếp tốt nhất.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default AboutSignLanguage;
