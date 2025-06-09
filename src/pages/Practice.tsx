
import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, XCircle, Trophy, Star, ArrowRight } from 'lucide-react';
import { themes, getWordsByTheme, getAllWords, VocabularyItem } from '../data/vocabulary';
import VideoPlayer from '../components/VideoPlayer';

interface Question {
  id: string;
  type: 'image-to-sign' | 'video-to-sign' | 'sign-to-image' | 'complete-sequence';
  question: string;
  correctAnswer: VocabularyItem;
  options: VocabularyItem[];
  media?: string;
}

const Practice = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const generateQuestions = (theme: string) => {
    const words = theme === 'all' ? getAllWords() : getWordsByTheme(theme);
    const questionTypes: Question['type'][] = [
      'image-to-sign',
      'video-to-sign', 
      'sign-to-image',
      'complete-sequence'
    ];

    const generatedQuestions: Question[] = [];

    for (let i = 0; i < 10; i++) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      // Generate wrong answers
      const wrongAnswers = words
        .filter(w => w.id !== randomWord.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      const options = [randomWord, ...wrongAnswers].sort(() => Math.random() - 0.5);

      let questionText = '';
      let media = '';

      switch (questionType) {
        case 'image-to-sign':
          questionText = 'Chọn video ngôn ngữ ký hiệu phù hợp với hình ảnh:';
          media = randomWord.image;
          break;
        case 'video-to-sign':
          questionText = 'Chọn video ngôn ngữ ký hiệu phù hợp với video minh họa:';
          media = randomWord.video || randomWord.image;
          break;
        case 'sign-to-image':
          questionText = 'Chọn hình ảnh phù hợp với video ngôn ngữ ký hiệu:';
          media = randomWord.sign_language_video || randomWord.image;
          break;
        case 'complete-sequence':
          questionText = `Chọn từ thích hợp để hoàn thành câu: "Tôi thấy _____ trong vườn"`;
          break;
      }

      generatedQuestions.push({
        id: `q${i + 1}`,
        type: questionType,
        question: questionText,
        correctAnswer: randomWord,
        options,
        media
      });
    }

    return generatedQuestions;
  };

  const startGame = () => {
    const newQuestions = generateQuestions(selectedTheme);
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(new Array(10).fill(false));
    setGameStarted(true);
    setGameFinished(false);
  };

  const selectAnswer = (wordId: string) => {
    if (answered[currentQuestion]) return;
    setSelectedAnswer(wordId);
  };

  const checkAnswer = () => {
    if (!selectedAnswer || answered[currentQuestion]) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer.id;
    const newAnswered = [...answered];
    newAnswered[currentQuestion] = true;
    setAnswered(newAnswered);

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameFinished(true);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameFinished(false);
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / 10) * 100;
    if (percentage >= 90) return { message: "Xuất sắc! 🎉", color: "text-green-600" };
    if (percentage >= 70) return { message: "Tốt! 👏", color: "text-blue-600" };
    if (percentage >= 50) return { message: "Khá! 👍", color: "text-yellow-600" };
    return { message: "Cần cố gắng thêm! 💪", color: "text-red-600" };
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Bài tập Ôn tập
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Luyện tập nhận biết từ vựng và ngôn ngữ ký hiệu thông qua các câu hỏi trắc nghiệm
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
            <div className="text-center mb-8">
              <Trophy className="w-16 h-16 text-education-orange mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Sẵn sàng thử thách?
              </h2>
              <p className="text-gray-600">
                Chọn chủ đề và bắt đầu bài tập với 10 câu hỏi trắc nghiệm
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chọn chủ đề
              </label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="input-field mb-6"
              >
                <option value="all">Tất cả chủ đề</option>
                {themes.map(theme => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>

              <button
                onClick={startGame}
                className="w-full btn-primary text-lg py-4"
              >
                Bắt đầu luyện tập
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <Star className="w-8 h-8 text-education-blue mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">4 loại câu hỏi</h3>
                <p className="text-sm text-gray-600">
                  Hình ảnh, video minh họa, ngôn ngữ ký hiệu và hoàn thành câu
                </p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <CheckCircle className="w-8 h-8 text-education-green mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Phản hồi tức thì</h3>
                <p className="text-sm text-gray-600">
                  Nhận kết quả và giải thích ngay sau mỗi câu trả lời
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameFinished) {
    const scoreInfo = getScoreMessage();
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center animate-bounce-in">
            <Trophy className="w-20 h-20 text-education-orange mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Hoàn thành bài tập!
            </h1>
            
            <div className="text-6xl font-bold mb-4 gradient-text">
              {score}/10
            </div>
            
            <p className={`text-xl font-semibold mb-6 ${scoreInfo.color}`}>
              {scoreInfo.message}
            </p>

            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-education-blue">{score}</div>
                <div className="text-sm text-gray-600">Đúng</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{10 - score}</div>
                <div className="text-sm text-gray-600">Sai</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-education-green">{Math.round((score / 10) * 100)}%</div>
                <div className="text-sm text-gray-600">Tỷ lệ</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={startGame}
                className="btn-primary"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Làm lại
              </button>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300"
              >
                Chọn chủ đề khác
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Câu {currentQuestion + 1} / {questions.length}
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

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 animate-slide-up">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQ.question}
          </h2>

          {/* Media Display */}
          {currentQ.media && (
            <div className="mb-8 flex justify-center">
              {currentQ.type === 'image-to-sign' || currentQ.type === 'sign-to-image' ? (
                <div className="w-64 h-64 rounded-xl overflow-hidden">
                  <img
                    src={currentQ.media}
                    alt="Question media"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <VideoPlayer
                  src={currentQ.media}
                  title="Question video"
                  className="w-64 h-64"
                />
              )}
            </div>
          )}

          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {currentQ.options.map((option) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.id === currentQ.correctAnswer.id;
              const isWrong = answered[currentQuestion] && isSelected && !isCorrect;
              const showCorrect = answered[currentQuestion] && isCorrect;

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
                  onClick={() => selectAnswer(option.id)}
                  disabled={answered[currentQuestion]}
                  className={buttonClass}
                >
                  <div className="flex items-center space-x-4">
                    {currentQ.type === 'sign-to-image' ? (
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
                      <div className="text-sm opacity-75">{option.theme}</div>
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
              selectedAnswer === currentQ.correctAnswer.id 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                {selectedAnswer === currentQ.correctAnswer.id ? (
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
                Đáp án đúng: <strong>{currentQ.correctAnswer.word}</strong>
                {currentQ.correctAnswer.description && (
                  <span> - {currentQ.correctAnswer.description}</span>
                )}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <div className="text-sm text-gray-500">
              {selectedTheme === 'all' ? 'Tất cả chủ đề' : selectedTheme}
            </div>
            <div className="space-x-4">
              {!showResult ? (
                <button
                  onClick={checkAnswer}
                  disabled={!selectedAnswer}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Kiểm tra
                </button>
              ) : (
                <button
                  onClick={nextQuestion}
                  className="btn-primary flex items-center"
                >
                  {currentQuestion < questions.length - 1 ? (
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
      </div>
    </div>
  );
};

export default Practice;
