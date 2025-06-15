
import React from 'react';
import { Camera } from 'lucide-react';
import { Question } from './types';

interface CameraPracticeQuestionProps {
  question: Question;
  onStartCameraPractice: () => void;
}

const CameraPracticeQuestion: React.FC<CameraPracticeQuestionProps> = ({
  question,
  onStartCameraPractice,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-slide-up">
      <Camera className="w-16 h-16 text-education-blue mx-auto mb-6" />
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {question.question}
      </h2>
      <p className="text-gray-600 mb-8">
        Nhấn nút bên dưới để mở camera và thực hiện ngôn ngữ ký hiệu
      </p>
      
      <button
        onClick={onStartCameraPractice}
        className="btn-primary text-lg px-8 py-4"
      >
        <Camera className="w-5 h-5 mr-2" />
        Bắt đầu thực hành
      </button>
    </div>
  );
};

export default CameraPracticeQuestion;
