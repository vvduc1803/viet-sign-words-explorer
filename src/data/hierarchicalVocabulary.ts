
import { VocabularyItem } from './types';
import { vocabularyData } from './vocabularyData';

export interface HierarchicalCategory {
  id: string;
  name: string;
  level: number;
  parentId?: string;
  children?: HierarchicalCategory[];
  words?: VocabularyItem[];
  wordCount: number;
  icon?: string;
}

// Tạo cấu trúc phân cấp từ dữ liệu vocabulary hiện có
export const createHierarchicalStructure = (): HierarchicalCategory[] => {
  const categoryMap = new Map<string, HierarchicalCategory>();
  const rootCategories: HierarchicalCategory[] = [];

  // Process each vocabulary item to build hierarchy
  vocabularyData.forEach(word => {
    if (word.categories && word.categories.length > 0) {
      let currentParentId: string | undefined = undefined;
      
      word.categories.forEach((categoryName, level) => {
        const categoryId = currentParentId 
          ? `${currentParentId}/${categoryName}`
          : categoryName;
        
        if (!categoryMap.has(categoryId)) {
          const category: HierarchicalCategory = {
            id: categoryId,
            name: categoryName,
            level,
            parentId: currentParentId,
            children: [],
            words: [],
            wordCount: 0,
            icon: getCategoryIcon(categoryName, level)
          };
          
          categoryMap.set(categoryId, category);
          
          if (currentParentId) {
            const parent = categoryMap.get(currentParentId);
            if (parent) {
              parent.children = parent.children || [];
              parent.children.push(category);
            }
          } else {
            rootCategories.push(category);
          }
        }
        
        currentParentId = categoryId;
      });
      
      // Add word to the deepest category
      if (currentParentId) {
        const deepestCategory = categoryMap.get(currentParentId);
        if (deepestCategory) {
          deepestCategory.words = deepestCategory.words || [];
          deepestCategory.words.push(word);
        }
      }
    }
  });

  // Calculate word counts recursively
  const calculateWordCounts = (category: HierarchicalCategory): number => {
    let count = category.words?.length || 0;
    
    if (category.children) {
      category.children.forEach(child => {
        count += calculateWordCounts(child);
      });
    }
    
    category.wordCount = count;
    return count;
  };

  rootCategories.forEach(calculateWordCounts);
  
  return rootCategories;
};

const getCategoryIcon = (categoryName: string, level: number): string => {
  const iconMap: Record<string, string> = {
    'Động vật': '🦁',
    'Thực phẩm': '🍎',
    'Gia đình': '👨‍👩‍👧‍👦',
    'Gia cầm': '🐔',
    'Thú cưng': '🐕',
    'Động vật hoang dã': '🦁',
    'Trái cây': '🍎',
    'Rau củ': '🥕',
    'Cha mẹ': '👨‍👩',
    'Anh chị em': '👦👧',
    'Chim': '🐦',
    'Vitamin C': '🍊',
    'Tươi': '🌿'
  };
  
  return iconMap[categoryName] || (level === 0 ? '📁' : level === 1 ? '📂' : '📄');
};

export const getWordsFromCategory = (
  categories: HierarchicalCategory[],
  categoryId: string
): VocabularyItem[] => {
  const findCategory = (cats: HierarchicalCategory[], id: string): HierarchicalCategory | null => {
    for (const cat of cats) {
      if (cat.id === categoryId) return cat;
      if (cat.children) {
        const found = findCategory(cat.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const category = findCategory(categories, categoryId);
  if (!category) return [];

  const getAllWords = (cat: HierarchicalCategory): VocabularyItem[] => {
    let words = [...(cat.words || [])];
    if (cat.children) {
      cat.children.forEach(child => {
        words = words.concat(getAllWords(child));
      });
    }
    return words;
  };

  return getAllWords(category);
};

export const hierarchicalCategories = createHierarchicalStructure();
