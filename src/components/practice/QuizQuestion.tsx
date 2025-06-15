
import React from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { Question } from './types';
import VideoPlayer from '../VideoPlayer';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  showResult: boolean;
  answered: boolean;
  selectedTheme: string;
  practiceMode: 'quiz' | 'camera';
  onSelectAnswer: (wordId: string) => void;
  onCheckAnswer: () => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  showResult,
  answered,
  selectedTheme,
  practiceMode,
  onSelectAnswer,
  onCheckAnswer,
  onNextQuestion,
  isLastQuestion,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-slide-up">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {question.question}
      </h2>

      {/* Media Display */}
      {question.media && (
        <div className="mb-8 flex justify-center">
          {question.type === 'image-to-sign' || question.type === 'sign-to-image' ? (
            <div className="w-64 h-64 rounded-xl overflow-hidden">
              <img
                src={question.media}
                alt="Question media"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <VideoPlayer
              src={question.media}
              title="Question video"
              className="w-64 h-64"
            />
          )}
        </div>
      )}

      {/* Answer Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrect = option.id === question.correctAnswer.id;
          const isWrong = answered && isSelected && !isCorrect;
          const showCorrect = answered && isCorrect;

          let buttonClass = "w-full p-4 border-2 rounded-xl transition-all duration-300 text-left ";
          
          if (showResult) {
            if (showCorrect) {
              buttonClass += "border-green-500 bg-green-50 text-green-800";
            } else if (isWrong) {
              buttonClass += "border-red-500 bg-red-50 text-red-800";
            } else {
              buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
            }
          } else if (isSelected) {
            buttonClass += "border-education-blue bg-blue-50 text-education-blue";
          } else {
            buttonClass += "border-gray-200 hover:border-education-blue hover:bg-blue-50 text-gray-800";
          }

          return (
            <button
              key={option.id}
              onClick={() => onSelectAnswer(option.id)}
              disabled={answered}
              className={buttonClass}
            >
              <div className="flex items-center space-x-4">
                {question.type === 'sign-to-image' ? (
                  <img
                    src={option.image}
                    alt={option.word}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                ) : (
                  <VideoPlayer
                    src={option.sign_language_video}
                    title={`Ký hiệu: ${option.word}`}
                    className="w-16 h-16"
                  />
                )}
                <div>
                  <div className="font-medium">{option.word}</div>
                  <div className="text-sm opacity-75">{option.category}</div>
                </div>
                {showResult && showCorrect && (
                  <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                )}
                {showResult && isWrong && (
                  <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Result Message */}
      {showResult && (
        <div className={`p-4 rounded-xl mb-6 ${
          selectedAnswer === question.correctAnswer.id 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center space-x-2 mb-2">
            {selectedAnswer === question.correctAnswer.id ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="font-medium text-green-800">Chính xác!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="font-medium text-red-800">Không chính xác</span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-600">
            Đáp án đúng: <strong>{question.correctAnswer.word}</strong>
            {question.correctAnswer.description && (
              <span> - {question.correctAnswer.description}</span>
            )}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <div className="text-sm text-gray-500">
          {practiceMode === 'camera' ? 'Thực hành Camera' : 'Trắc nghiệm'} • {selectedTheme === 'all' ? 'Tất cả chủ đề' : selectedTheme}
        </div>
        <div className="space-x-4">
          {!showResult ? (
            <button
              onClick={onCheckAnswer}
              disabled={!selectedAnswer}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Kiểm tra
            </button>
          ) : (
            <button
              onClick={onNextQuestion}
              className="btn-primary flex items-center"
            >
              {!isLastQuestion ? (
                <>
                  Câu tiếp theo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                'Xem kết quả'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
