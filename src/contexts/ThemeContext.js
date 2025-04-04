import React, { createContext, useState, useEffect } from 'react';

// Создаем контекст
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Получаем сохраненную тему из localStorage или используем светлую тему по умолчанию
  const savedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(savedTheme);

  // Применяем тему к document.body при изменении темы
  useEffect(() => {
    // Сохраняем выбранную тему в localStorage
    localStorage.setItem('theme', theme);
    
    // Применяем класс темы к body
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    
    // Обновляем мета-тег theme-color для мобильных браузеров
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#121212' : '#ffffff');
    }
  }, [theme]);

  // Функция для переключения темы
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext; 