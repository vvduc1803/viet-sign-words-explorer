
import { VocabularyItem } from './types';
import { getWordById } from './vocabularyUtils';

// Personal Collection Functions
export const getPersonalCollection = (): VocabularyItem[] => {
  const stored = localStorage.getItem('personalCollection');
  if (!stored) return [];
  
  const ids = JSON.parse(stored);
  return ids.map((id: string) => getWordById(id)).filter(Boolean);
};

export const addToPersonalCollection = (wordId: string): void => {
  const current = localStorage.getItem('personalCollection');
  const collection = current ? JSON.parse(current) : [];
  
  if (!collection.includes(wordId)) {
    collection.push(wordId);
    localStorage.setItem('personalCollection', JSON.stringify(collection));
  }
};

export const removeFromPersonalCollection = (wordId: string): void => {
  const current = localStorage.getItem('personalCollection');
  if (!current) return;
  
  const collection = JSON.parse(current);
  const updated = collection.filter((id: string) => id !== wordId);
  localStorage.setItem('personalCollection', JSON.stringify(updated));
};

export const isInPersonalCollection = (wordId: string): boolean => {
  const current = localStorage.getItem('personalCollection');
  if (!current) return false;
  
  const collection = JSON.parse(current);
  return collection.includes(wordId);
};
