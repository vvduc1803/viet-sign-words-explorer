
import { VocabularyItem, getAllWords, getWordsByTheme } from '../../data/vocabulary';
import { Question } from './types';

export const generateQuestions = (
  theme: string, 
  mode: 'quiz' | 'camera', 
  usePersonalCollection: boolean = false, 
  personalCollectionWords: VocabularyItem[] = []
): Question[] => {
  let words: VocabularyItem[];
  
  if (usePersonalCollection) {
    words = personalCollectionWords;
    if (words.length === 0) {
      return [];
    }
  } else {
    words = theme === 'all' ? getAllWords() : getWordsByTheme(theme);
  }
  
  const generatedQuestions: Question[] = [];

  if (mode === 'camera') {
    // Tạo 5 câu hỏi camera practice
    const questionCount = Math.min(5, words.length);
    for (let i = 0; i < questionCount; i++) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      generatedQuestions.push({
        id: `camera${i + 1}`,
        type: 'camera-practice',
        question: `Thực hiện ngôn ngữ ký hiệu cho từ: "${randomWord.word}"`,
        correctAnswer: randomWord,
        options: []
      });
    }
  } else {
    // Quiz question generation
    const questionTypes: Question['type'][] = [
      'image-to-sign',
      'video-to-sign', 
      'sign-to-image',
      'complete-sequence'
    ];

    const questionCount = Math.min(10, words.length);
    for (let i = 0; i < questionCount; i++) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
      
      // Generate wrong answers
      const wrongAnswers = words
        .filter(w => w.id !== randomWord.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.min(3, words.length - 1));

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
  }

  return generatedQuestions;
};
