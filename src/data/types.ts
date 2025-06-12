
export interface VocabularyItem {
  id: string;
  word: string;
  category: string;
  subcategory: string;
  image: string;
  video?: string;
  sign_language_video?: string;
  description?: string;
  theme?: string; // For backward compatibility
}

export interface SubCategory {
  name: string;
  words: VocabularyItem[];
}

export interface Category {
  name: string;
  subcategories: SubCategory[];
}
