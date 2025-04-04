import React, { useState, useEffect } from 'react';
import { useNews } from '../hooks/useNews';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import NewsCard from '../components/NewsCard';
import './Home.css';

const Home = () => {
  const { news, loading, filterNewsByCategories, deleteNews } = useNews();
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [removingNewsId, setRemovingNewsId] = useState(null);
  const [stats, setStats] = useState({
    totalNews: 0,
    totalLikes: 0,
    totalFavorites: 0,
    popularCategory: ''
  });
  
  // Фильтрация новостей при изменении выбранных категорий или списка новостей
  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredNews(news);
    } else {
      setFilteredNews(filterNewsByCategories(selectedCategories));
    }
  }, [selectedCategories, news, filterNewsByCategories]);
  
  // Инициализация выбранных категорий из предпочтений пользователя
  useEffect(() => {
    if (currentUser && currentUser.preferences && currentUser.preferences.themes) {
      setSelectedCategories(currentUser.preferences.themes);
    }
  }, [currentUser]);
  
  // Расчет статистики
  useEffect(() => {
    if (news && news.length > 0) {
      const totalLikes = news.reduce((sum, item) => sum + (item.likes || 0), 0);
      const totalFavorites = news.reduce((sum, item) => sum + (item.favoritedBy?.length || 0), 0);
      
      // Определение популярной категории
      const categories = {};
      news.forEach(item => {
        if (item.category) {
          categories[item.category] = (categories[item.category] || 0) + 1;
        }
      });
      
      let popularCategory = '';
      let maxCount = 0;
      
      Object.entries(categories).forEach(([category, count]) => {
        if (count > maxCount) {
          maxCount = count;
          popularCategory = category;
        }
      });
      
      setStats({
        totalNews: news.length,
        totalLikes,
        totalFavorites,
        popularCategory: getCategoryName(popularCategory)
      });
    }
  }, [news]);
  
  // Обработчик изменения выбранных категорий
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  // Сброс фильтров
  const resetFilters = () => {
    setSelectedCategories([]);
  };
  
  // Обработчик удаления новости
  const handleDeleteNews = (newsId) => {
    setRemovingNewsId(newsId);
    setTimeout(() => {
      deleteNews(newsId);
      setRemovingNewsId(null);
    }, 500);
  };
  
  // Получение названия категории
  const getCategoryName = (category) => {
    if (!category) return 'Разное';
    
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
        return 'Разное';
    }
  };
  
  // Получение иконки для категории
  const getCategoryIcon = (category) => {
    if (!category) return 'fas fa-newspaper';
    
    switch (category) {
      case 'politics':
        return 'fas fa-landmark';
      case 'technology':
        return 'fas fa-microchip';
      case 'sports':
        return 'fas fa-futbol';
      case 'entertainment':
        return 'fas fa-film';
      default:
        return 'fas fa-newspaper';
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <h1>Добро пожаловать в FakeNews Generator</h1>
          <p>Генератор фейковых новостей для развлечения и образовательных целей</p>
          
          <div className="hero-buttons">
            <a href="/generator" className="hero-button primary">
              <i className="fas fa-magic"></i>
              <span>Создать новость</span>
            </a>
            {!currentUser && (
              <a href="/login" className="hero-button secondary">
                <i className="fas fa-sign-in-alt"></i>
                <span>Войти</span>
              </a>
            )}
          </div>
        </div>
        
        <div className="hero-shapes">
          <div className="hero-shape shape1"></div>
          <div className="hero-shape shape2"></div>
          <div className="hero-shape shape3"></div>
        </div>
      </div>
      
      <div className="container">
        <div className="stats-section">
          <div className="stats-card">
            <div className="stats-icon">
              <i className="fas fa-newspaper"></i>
            </div>
            <div className="stats-content">
              <h3>{stats.totalNews}</h3>
              <p>Всего новостей</p>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="stats-icon">
              <i className="fas fa-heart"></i>
            </div>
            <div className="stats-content">
              <h3>{stats.totalLikes}</h3>
              <p>Всего лайков</p>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="stats-icon">
              <i className="fas fa-bookmark"></i>
            </div>
            <div className="stats-content">
              <h3>{stats.totalFavorites}</h3>
              <p>В избранном</p>
            </div>
          </div>
          
          <div className="stats-card">
            <div className="stats-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stats-content">
              <h3>{stats.popularCategory}</h3>
              <p>Популярная категория</p>
            </div>
          </div>
        </div>
        
        <div className="filter-section">
          <h2>Фильтр по категориям</h2>
          <div className="category-filters">
            {['politics', 'technology', 'sports', 'entertainment'].map(category => (
              <button
                key={category}
                className={`category-filter ${selectedCategories.includes(category) ? 'active' : ''} ${theme === 'dark' ? 'dark' : 'light'}`}
                onClick={() => handleCategoryChange(category)}
              >
                <i className={getCategoryIcon(category)}></i>
                <span>{getCategoryName(category)}</span>
              </button>
            ))}
            
            <button 
              className={`reset-filter ${theme === 'dark' ? 'dark' : 'light'}`} 
              onClick={resetFilters}
            >
              <i className="fas fa-times"></i>
              <span>Сбросить</span>
            </button>
          </div>
        </div>
        
        <div className="news-list">
          {loading ? (
            <div className="loading">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Загрузка новостей...</p>
            </div>
          ) : filteredNews && filteredNews.length > 0 ? (
            filteredNews.map(item => (
              <div 
                key={item.id} 
                className={`news-item ${removingNewsId === item.id ? 'removing' : ''}`}
              >
                <NewsCard 
                  news={item} 
                  showDeleteButton={true} 
                  onDelete={handleDeleteNews} 
                />
              </div>
            ))
          ) : (
            <div className="no-news">
              <i className="fas fa-newspaper"></i>
              <p>Новости не найдены. Попробуйте изменить фильтры или создать новые новости.</p>
              <a href="/generator" className="create-news-btn">
                <i className="fas fa-plus-circle"></i>
                <span>Создать новость</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 