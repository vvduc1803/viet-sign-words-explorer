
import React, { useState } from 'react';
import { Send, MessageCircle, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'feedback',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', type: 'feedback', message: '' });
    }, 3000);
  };

  const faqs = [
    {
      question: 'Làm thế nào để học ngôn ngữ ký hiệu hiệu quả?',
      answer: 'Bạn nên bắt đầu với bảng chữ cái và các từ cơ bản, luyện tập thường xuyên, tham gia cộng đồng người Điếc và sử dụng các tài liệu học tập đa dạng.'
    },
    {
      question: 'Tôi có thể tìm phiên dịch viên NNKH ở đâu?',
      answer: 'Bạn có thể liên hệ với các hiệp hội người khuyết tật, trung tâm hỗ trợ người Điếc hoặc tìm kiếm qua các trang web chuyên về dịch vụ phiên dịch NNKH.'
    },
    {
      question: 'SignUs có miễn phí không?',
      answer: 'Có, SignUs hoàn toàn miễn phí. Chúng tôi cam kết cung cấp các tài liệu học tập và công cụ tra cứu mà không thu phí.'
    },
    {
      question: 'Tôi có thể đóng góp nội dung cho SignUs không?',
      answer: 'Chúng tôi rất hoan nghênh sự đóng góp từ cộng đồng. Bạn có thể gửi góp ý qua form này hoặc liên hệ trực tiếp với đội ngũ phát triển.'
    },
    {
      question: 'Làm thế nào để báo cáo lỗi hoặc vấn đề kỹ thuật?',
      answer: 'Vui lòng mô tả chi tiết vấn đề bạn gặp phải trong form góp ý bên dưới, chọn loại "Báo cáo lỗi" và gửi cho chúng tôi.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Hỏi đáp & Góp ý
          </h1>
          <p className="text-xl text-gray-600">
            Chúng tôi luôn lắng nghe ý kiến đóng góp từ cộng đồng
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Feedback Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-6 h-6 text-education-blue" />
              <h2 className="text-2xl font-bold text-gray-800">
                Gửi góp ý
              </h2>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Cảm ơn bạn!
                </h3>
                <p className="text-gray-600">
                  Góp ý của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi sớm nhất có thể.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="input-field"
                    placeholder="Nhập họ và tên của bạn"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="input-field"
                    placeholder="Nhập địa chỉ email của bạn"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loại góp ý *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="input-field"
                  >
                    <option value="feedback">Góp ý chung</option>
                    <option value="bug">Báo cáo lỗi</option>
                    <option value="feature">Đề xuất tính năng</option>
                    <option value="content">Đóng góp nội dung</option>
                    <option value="question">Câu hỏi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Chia sẻ ý kiến, góp ý hoặc câu hỏi của bạn..."
                    required
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || !formData.message}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Gửi góp ý
                </button>
              </div>
            )}
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-6 h-6 text-education-blue" />
              <h2 className="text-2xl font-bold text-gray-800">
                Câu hỏi thường gặp
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 bg-gradient-to-r from-education-blue to-education-purple rounded-xl shadow-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            Liên hệ trực tiếp
          </h2>
          <p className="text-lg mb-6">
            Bạn cũng có thể liên hệ trực tiếp với chúng tôi qua:
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-1">Email</h3>
              <p>support@signus.vn</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-1">Hotline</h3>
              <p>1900 1234</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-semibold mb-1">Giờ làm việc</h3>
              <p>8:00 - 17:00 (T2-T6)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
