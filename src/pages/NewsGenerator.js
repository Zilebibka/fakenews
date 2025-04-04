import React, { useState } from 'react';
import { useNews } from '../hooks/useNews';
import { useTheme } from '../hooks/useTheme';
import NewsCard from '../components/NewsCard';
import './NewsGenerator.css';

const NewsGenerator = () => {
  const { generateNews } = useNews();
  const { theme } = useTheme();
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [generatedNews, setGeneratedNews] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Обработчик изменения категории
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  
  // Обработчик генерации новости
  const handleGenerateNews = () => {
    setIsGenerating(true);
    
    // Имитация задержки для создания эффекта генерации
    setTimeout(() => {
      const newNews = generateNews(selectedCategory || undefined);
      setGeneratedNews(newNews);
      setIsGenerating(false);
    }, 1000);
  };
  
  // Получение названия категории
  const getCategoryName = (category) => {
    if (!category) return 'Случайная категория';
    
    switch (category) {
      case 'politics':
        return 'Политика';
      case 'technology':
        return 'Технологии';
      case 'sports':
        return 'Спорт';
      case 'entertainment':
        return 'Развлечения';
      default:
        return 'Случайная категория';
    }
  };

  return (
    <div className="news-generator-page">
      <div className="container">
        <div className="generator-header">
          <h1>Генератор новостей</h1>
          <p>Создавайте фейковые новости на любую тему</p>
        </div>
        
        <div className={`generator-form ${theme === 'dark' ? 'dark' : 'light'}`}>
          <div className="form-group">
            <label htmlFor="category">Выберите категорию:</label>
            <select 
              id="category" 
              value={selectedCategory} 
              onChange={handleCategoryChange}
              className={theme === 'dark' ? 'dark' : 'light'}
            >
              <option value="">Случайная категория</option>
              <option value="politics">Политика</option>
              <option value="technology">Технологии</option>
              <option value="sports">Спорт</option>
              <option value="entertainment">Развлечения</option>
            </select>
          </div>
          
          <button 
            className="generate-btn" 
            onClick={handleGenerateNews}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                <span>Генерация...</span>
              </>
            ) : (
              <>
                <i className="fas fa-magic"></i>
                <span>Сгенерировать новость</span>
              </>
            )}
          </button>
        </div>
        
        {generatedNews && (
          <div className="generated-news">
            <h2>Сгенерированная новость</h2>
            <p className="category-info">
              <i className="fas fa-tag"></i>
              <span>Категория: {getCategoryName(generatedNews.category)}</span>
            </p>
            
            <NewsCard news={generatedNews} />
            
            <div className="share-section">
              <h3>Поделиться новостью</h3>
              <div className="share-buttons">
                <a 
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(generatedNews.title + ' ' + window.location.origin + '/news/' + generatedNews.id)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="share-btn whatsapp"
                >
                  <i className="fab fa-whatsapp"></i>
                  <span>WhatsApp</span>
                </a>
                
                <a 
                  href={`https://t.me/share/url?url=${encodeURIComponent(window.location.origin + '/news/' + generatedNews.id)}&text=${encodeURIComponent(generatedNews.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="share-btn telegram"
                >
                  <i className="fab fa-telegram-plane"></i>
                  <span>Telegram</span>
                </a>
                
                <a 
                  href={`https://vk.com/share.php?url=${encodeURIComponent(window.location.origin + '/news/' + generatedNews.id)}&title=${encodeURIComponent(generatedNews.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="share-btn vk"
                >
                  <i className="fab fa-vk"></i>
                  <span>VK</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsGenerator; 