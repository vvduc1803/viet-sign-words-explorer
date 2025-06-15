
import React from 'react';

interface PracticeProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

const PracticeProgress: React.FC<PracticeProgressProps> = ({
  currentQuestion,
  totalQuestions,
  score,
}) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          {currentQuestion < totalQuestions ? 'Câu' : 'Bài'} {currentQuestion + 1} / {totalQuestions}
        </span>
        <span className="text-sm font-medium text-education-blue">
          Điểm: {score}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-education-blue to-education-purple h-3 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default PracticeProgress;
