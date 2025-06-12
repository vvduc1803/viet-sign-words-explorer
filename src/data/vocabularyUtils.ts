
import { VocabularyItem } from './types';
import { vocabularyData } from './vocabularyData';

// Helper functions
export const getCategories = (): string[] => {
  return [...new Set(vocabularyData.map(item => item.category))];
};

export const getSubcategories = (category: string): string[] => {
  return [...new Set(vocabularyData.filter(item => item.category === category).map(item => item.subcategory))];
};

export const getWordsByCategory = (category: string): VocabularyItem[] => {
  return vocabularyData.filter(item => item.category === category);
};

export const getWordsBySubcategory = (category: string, subcategory: string): VocabularyItem[] => {
  return vocabularyData.filter(item => item.category === category && item.subcategory === subcategory);
};

export const getWordById = (id: string): VocabularyItem | undefined => {
  return vocabularyData.find(item => item.id === id);
};

export const searchWord = (query: string): VocabularyItem | null => {
  const normalizedQuery = query.toLowerCase().trim();
  return vocabularyData.find(item => 
    item.word.toLowerCase().includes(normalizedQuery)
  ) || null;
};

export const getAllWords = (): VocabularyItem[] => {
  return vocabularyData;
};

// For backward compatibility with themes
export const themes = getCategories();

export const getWordsByTheme = (theme: string): VocabularyItem[] => {
  return getWordsByCategory(theme);
};
