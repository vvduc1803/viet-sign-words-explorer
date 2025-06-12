
// Re-export all types
export type { VocabularyItem, SubCategory, Category } from './types';

// Re-export data
export { vocabularyData } from './vocabularyData';

// Re-export utility functions
export {
  getCategories,
  getSubcategories,
  getWordsByCategory,
  getWordsBySubcategory,
  getWordById,
  searchWord,
  getAllWords,
  themes,
  getWordsByTheme
} from './vocabularyUtils';

// Re-export personal collection functions
export {
  getPersonalCollection,
  addToPersonalCollection,
  removeFromPersonalCollection,
  isInPersonalCollection
} from './personalCollection';
