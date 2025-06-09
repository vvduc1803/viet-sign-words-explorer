
export interface VocabularyItem {
  id: string;
  word: string;
  theme: string;
  image: string;
  video?: string;
  sign_language_video?: string;
  description?: string;
}

export const vocabularyData: VocabularyItem[] = [
  // Động vật
  {
    id: "1",
    word: "con gà",
    theme: "Động vật",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Gia cầm được nuôi để lấy thịt và trứng"
  },
  {
    id: "2",
    word: "con chó",
    theme: "Động vật",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Động vật thân thiện với con người"
  },
  {
    id: "3",
    word: "con mèo",
    theme: "Động vật",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Động vật nuôi trong gia đình"
  },
  {
    id: "4",
    word: "con bò",
    theme: "Động vật",
    image: "https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Gia súc được nuôi để lấy sữa và thịt"
  },
  {
    id: "5",
    word: "con heo",
    theme: "Động vật",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Gia súc được nuôi để lấy thịt"
  },
  {
    id: "6",
    word: "con vịt",
    theme: "Động vật",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Gia cầm sống gần nước"
  },
  {
    id: "7",
    word: "con cá",
    theme: "Động vật",
    image: "https://images.unsplash.com/photo-1544943150-4c3cd314cc1b?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Động vật sống dưới nước"
  },
  {
    id: "8",
    word: "con chim",
    theme: "Động vật",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Động vật có cánh, biết bay"
  },
  {
    id: "9",
    word: "con ngựa",
    theme: "Động vật",
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Động vật được sử dụng để cưỡi và kéo xe"
  },
  {
    id: "10",
    word: "con thỏ",
    theme: "Động vật",
    image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Động vật có tai dài, chạy nhanh"
  },

  // Thực vật
  {
    id: "11",
    word: "cây hoa",
    theme: "Thực vật",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Cây có hoa đẹp để trang trí"
  },
  {
    id: "12",
    word: "cây cỏ",
    theme: "Thực vật",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Thực vật nhỏ mọc sát đất"
  },
  {
    id: "13",
    word: "cây táo",
    theme: "Thực vật",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Cây ăn quả cho trái táo"
  },
  {
    id: "14",
    word: "cây chuối",
    theme: "Thực vật",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Cây nhiệt đới cho quả chuối"
  },
  {
    id: "15",
    word: "cây xoài",
    theme: "Thực vật",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Cây ăn quả cho trái xoài ngọt"
  },
  {
    id: "16",
    word: "cây lúa",
    theme: "Thực vật",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Cây lương thực chính của người Việt"
  },
  {
    id: "17",
    word: "cây dừa",
    theme: "Thực vật",
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c86a?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Cây nhiệt đới cho quả dừa"
  },
  {
    id: "18",
    word: "cây tre",
    theme: "Thực vật",
    image: "https://images.unsplash.com/photo-1550596334-7bb40a71b4bc?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Cây có thân rỗng, mọc nhanh"
  },
  {
    id: "19",
    word: "cây sen",
    theme: "Thực vật",
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Cây thuỷ sinh có hoa đẹp"
  },
  {
    id: "20",
    word: "cây lan",
    theme: "Thực vật",
    image: "https://images.unsplash.com/photo-1580777361964-27e249fbe6e8?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Cây hoa quý hiếm và đẹp"
  },

  // Gia đình
  {
    id: "21",
    word: "bố",
    theme: "Gia đình",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Người cha trong gia đình"
  },
  {
    id: "22",
    word: "mẹ",
    theme: "Gia đình",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Người mẹ trong gia đình"
  },
  {
    id: "23",
    word: "anh",
    theme: "Gia đình",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Anh trai trong gia đình"
  },
  {
    id: "24",
    word: "chị",
    theme: "Gia đình",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Chị gái trong gia đình"
  },
  {
    id: "25",
    word: "em",
    theme: "Gia đình",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Em trai hoặc em gái"
  },
  {
    id: "26",
    word: "ông",
    theme: "Gia đình",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Ông nội hoặc ông ngoại"
  },
  {
    id: "27",
    word: "bà",
    theme: "Gia đình",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Bà nội hoặc bà ngoại"
  },
  {
    id: "28",
    word: "cô",
    theme: "Gia đình",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Cô ruột hoặc cô dì"
  },
  {
    id: "29",
    word: "chú",
    theme: "Gia đình",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Chú ruột hoặc cậu"
  },
  {
    id: "30",
    word: "gia đình",
    theme: "Gia đình",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400",
    video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    sign_language_video: "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    description: "Tập hợp những người thân thuộc"
  }
];

export const themes = ["Động vật", "Thực vật", "Gia đình"];

export const searchWord = (query: string): VocabularyItem | null => {
  const normalizedQuery = query.toLowerCase().trim();
  return vocabularyData.find(item => 
    item.word.toLowerCase().includes(normalizedQuery)
  ) || null;
};

export const getWordsByTheme = (theme: string): VocabularyItem[] => {
  return vocabularyData.filter(item => item.theme === theme);
};

export const getAllWords = (): VocabularyItem[] => {
  return vocabularyData;
};
