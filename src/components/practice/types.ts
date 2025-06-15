
import { VocabularyItem } from '../../data/vocabulary';

export interface Question {
  id: string;
  type: 'image-to-sign' | 'video-to-sign' | 'sign-to-image' | 'complete-sequence' | 'camera-practice';
  question: string;
  correctAnswer: VocabularyItem;
  options: VocabularyItem[];
  media?: string;
}
