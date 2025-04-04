// Массивы изображений по категориям
const images = {
  politics: [
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600',
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600',
    'https://images.unsplash.com/photo-1575320181282-9afab399332c?w=600',
    'https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?w=600',
    'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=600',
    'https://images.unsplash.com/photo-1447727214830-cbcbf097b52c?w=600',
    'https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=600',
    'https://images.unsplash.com/photo-1494172892981-ce47ca4ae8be?w=600',
    'https://images.unsplash.com/photo-1464998857633-50e59fbf2fe6?w=600',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600'
  ],
  technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600',
    'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600',
    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=600',
    'https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?w=600',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600',
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600'
  ],
  sports: [
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600',
    'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600',
    'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=600',
    'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600',
    'https://images.unsplash.com/photo-1590227632180-80a3bf110871?w=600',
    'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=600',
    'https://images.unsplash.com/photo-1526232373132-0e4ee16ea914?w=600',
    'https://images.unsplash.com/photo-1565992441121-4367c2967103?w=600',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600'
  ],
  entertainment: [
    'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600',
    'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=600',
    'https://images.unsplash.com/photo-1603736087997-20bdb73e8e08?w=600',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',
    'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=600',
    'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600',
    'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600',
    'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600'
  ]
};

// Ключевые слова для поиска подходящих изображений
const keywords = {
  politics: {
    'санкции': 0,
    'закон': 1,
    'парламент': 1,
    'выборы': 7,
    'протесты': 5,
    'переговоры': 4,
    'саммит': 4,
    'президент': 3,
    'премьер': 3,
    'дипломат': 2,
    'флаг': 2,
    'союз': 2,
    'скандал': 8,
    'критика': 8,
    'дебаты': 8,
    'речь': 9,
    'выступление': 9,
    'конференция': 6
  },
  technology: {
    'смартфон': 2,
    'компьютер': 0,
    'робот': 1,
    'искусственный интеллект': 4,
    'виртуальная реальность': 3,
    'дрон': 5,
    'лаборатория': 6,
    'исследование': 6,
    'разработка': 7,
    'инновация': 7,
    'технология': 0,
    'программирование': 9,
    'код': 9,
    'сервер': 8,
    'данные': 8,
    'хакеры': 8,
    'патент': 7,
    'продукт': 2
  },
  sports: {
    'футбол': 0,
    'баскетбол': 1,
    'теннис': 2,
    'плавание': 3,
    'бег': 4,
    'стадион': 5,
    'медаль': 6,
    'команда': 7,
    'победа': 8,
    'тренировка': 9,
    'чемпионат': 5,
    'турнир': 5,
    'спортсмен': 7,
    'тренер': 7,
    'рекорд': 8,
    'травма': 9,
    'матч': 0,
    'игра': 0
  },
  entertainment: {
    'фильм': 0,
    'концерт': 1,
    'премия': 2,
    'знаменитость': 3,
    'премьера': 4,
    'фестиваль': 5,
    'сцена': 6,
    'музыка': 7,
    'театр': 8,
    'телевидение': 9,
    'актер': 3,
    'режиссер': 0,
    'певец': 1,
    'альбом': 7,
    'шоу': 9,
    'сериал': 9,
    'награда': 2,
    'роль': 0
  }
};

// Функция для поиска подходящего изображения по заголовку и категории
export const getImageForNews = (title, category) => {
  // Проверяем наличие заголовка
  if (!title) {
    title = "Новость дня";
  }
  
  // Если категория не указана или не существует, выбираем случайную
  const categories = Object.keys(images);
  const selectedCategory = category && categories.includes(category) 
    ? category 
    : categories[Math.floor(Math.random() * categories.length)];
  
  // Получаем список изображений для выбранной категории
  const categoryImages = images[selectedCategory];
  
  // Получаем ключевые слова для выбранной категории
  const categoryKeywords = keywords[selectedCategory];
  
  // Преобразуем заголовок в нижний регистр для поиска ключевых слов
  const lowerTitle = title.toLowerCase();
  
  // Ищем ключевые слова в заголовке
  let bestMatchIndex = -1;
  
  for (const [keyword, index] of Object.entries(categoryKeywords)) {
    if (lowerTitle.includes(keyword.toLowerCase())) {
      bestMatchIndex = index;
      break;
    }
  }
  
  // Если не нашли совпадений, выбираем случайное изображение
  if (bestMatchIndex === -1) {
    bestMatchIndex = Math.floor(Math.random() * categoryImages.length);
  }
  
  return categoryImages[bestMatchIndex];
}; 