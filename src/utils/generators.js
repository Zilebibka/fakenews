// Простые шаблоны для генерации заголовков
const titleTemplates = {
  Politics: [
    "Сенсация: [Политик] предлагает революционный закон о [Тема]",
    "Неожиданный поворот: [Страна] меняет курс в отношении [Тема]",
    "Эксклюзив: Раскрыты секретные переговоры о [Тема]"
  ],
  Technology: [
    "Прорыв: Учёные создали [Технология] будущего",
    "Революция в IT: [Компания] представляет [Продукт]",
    "Искусственный интеллект научился [Действие]"
  ],
  Sports: [
    "[Команда] одерживает сенсационную победу над [Соперник]",
    "Рекорд: [Спортсмен] устанавливает новый мировой рекорд в [Спорт]",
    "Скандал в [Спорт]: [Команда] обвиняется в [Нарушение]"
  ],
  Entertainment: [
    "[Знаменитость] шокирует публику неожиданным [Действие]",
    "Эксклюзив: [Фильм] становится самым [Прилагательное] в истории",
    "Сенсация: [Артист] объявляет о [Событие]"
  ]
};

// Заполнители для шаблонов
const placeholders = {
  Politics: {
    Политик: ["Президент", "Премьер-министр", "Сенатор", "Депутат"],
    Тема: ["экологии", "образования", "экономики", "безопасности"],
    Страна: ["США", "Китай", "Россия", "Германия"]
  },
  Technology: {
    Технология: ["квантовый компьютер", "нейросеть", "робот", "3D-принтер"],
    Компания: ["Google", "Apple", "Microsoft", "Tesla"],
    Продукт: ["смартфон будущего", "умные очки", "летающий автомобиль"],
    Действие: ["читать мысли", "предсказывать будущее", "решать глобальные проблемы"]
  },
  Sports: {
    Команда: ["Реал Мадрид", "Барселона", "Манчестер Юнайтед", "Бавария"],
    Соперник: ["ПСЖ", "Ливерпуль", "Ювентус", "Челси"],
    Спортсмен: ["Роналду", "Месси", "Мбаппе", "Холанд"],
    Спорт: ["футболе", "баскетболе", "теннисе", "хоккее"],
    Нарушение: ["допинге", "договорных матчах", "нарушении правил"]
  },
  Entertainment: {
    Знаменитость: ["Том Круз", "Леди Гага", "Брэд Питт", "Тейлор Свифт"],
    Действие: ["заявлением", "поступком", "решением", "преображением"],
    Фильм: ["Мстители", "Аватар", "Звёздные войны", "Матрица"],
    Прилагательное: ["успешным", "обсуждаемым", "противоречивым", "инновационным"],
    Артист: ["Бейонсе", "Эд Ширан", "Адель", "Дрейк"],
    Событие: ["мировом туре", "новом альбоме", "сотрудничестве века", "уходе со сцены"]
  }
};

// Функция для случайного выбора элемента из массива
const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Функция для замены заполнителей в шаблоне
const replacePlaceholders = (template, category) => {
  let result = template;
  const categoryPlaceholders = placeholders[category];
  
  for (const [key, values] of Object.entries(categoryPlaceholders)) {
    const pattern = new RegExp(`\\[${key}\\]`, 'g');
    result = result.replace(pattern, randomChoice(values));
  }
  
  return result;
};

// Генерация заголовка новости
export const generateTitle = (category) => {
  const template = randomChoice(titleTemplates[category]);
  return replacePlaceholders(template, category);
};

// Генерация содержания новости
export const generateContent = (category) => {
  // Генерируем 3-4 параграфа текста
  const paragraphCount = Math.floor(Math.random() * 2) + 3;
  const paragraphs = [];
  
  for (let i = 0; i < paragraphCount; i++) {
    const template = randomChoice(titleTemplates[category]);
    const paragraph = replacePlaceholders(template, category);
    paragraphs.push(paragraph);
  }
  
  return paragraphs.join('\n\n');
}; 