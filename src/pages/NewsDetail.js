import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import './NewsDetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getNewsById, likeNews, reactToNews, addToFavorites, removeFromFavorites } = useNews();
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [removingFavorite, setRemovingFavorite] = useState(false);
  
  // Загрузка новости по ID
  useEffect(() => {
    const newsItem = getNewsById(id);
    if (newsItem) {
      setNews(newsItem);
    }
    setLoading(false);
  }, [id, getNewsById]);
  
  // Форматирование даты
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };
  
  // Проверка, лайкнул ли пользователь новость
  const isLiked = () => {
    if (!currentUser || !news.likedBy) return false;
    return news.likedBy.includes(currentUser.uid);
  };
  
  // Проверка, добавил ли пользователь реакцию
  const getUserReaction = () => {
    if (!currentUser || !news.reactedBy) return null;
    return news.reactedBy[currentUser.uid];
  };
  
  // Проверка, добавлена ли новость в избранное
  const isFavorite = () => {
    if (!currentUser || !news.favoritedBy) return false;
    return news.favoritedBy.includes(currentUser.uid);
  };
  
  // Обработчик лайка
  const handleLike = () => {
    if (!currentUser) {
      alert('Пожалуйста, войдите в систему, чтобы поставить лайк');
      return;
    }
    likeNews(news.id);
    setNews(getNewsById(id)); // Обновляем новость после изменения
  };
  
  // Обработчик реакции
  const handleReaction = (reaction) => {
    if (!currentUser) {
      alert('Пожалуйста, войдите в систему, чтобы добавить реакцию');
      return;
    }
    reactToNews(news.id, reaction);
    setNews(getNewsById(id)); // Обновляем новость после изменения
  };
  
  // Обработчик добавления в избранное
  const handleFavorite = () => {
    if (!currentUser) {
      alert('Пожалуйста, войдите в систему, чтобы добавить в избранное');
      return;
    }

    if (isFavorite()) {
      setRemovingFavorite(true);
      setTimeout(() => {
        removeFromFavorites(news.id);
        setRemovingFavorite(false);
        setNews(getNewsById(id)); // Обновляем новость после изменения
      }, 500);
    } else {
      addToFavorites(news.id);
      setNews(getNewsById(id)); // Обновляем новость после изменения
    }
  };
  
  // Получение названия категории
  const getCategoryName = (category) => {
    if (!category) return 'Разное';
    
    switch (category.toLowerCase()) {
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
    
    switch (category.toLowerCase()) {
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
  
  // Обработчик возврата на предыдущую страницу
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return (
      <div className="news-detail-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Загрузка новости...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!news) {
    return (
      <div className="news-detail-page">
        <div className="container">
          <div className="news-not-found">
            <i className="fas fa-exclamation-circle"></i>
            <h2>Новость не найдена</h2>
            <p>Запрашиваемая новость не существует или была удалена.</p>
            <a href="/" className="back-to-home">
              <i className="fas fa-home"></i>
              <span>На главную</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="news-detail-page">
      <div className="container">
        <div className="news-detail-container">
          <div className="news-detail-header">
            <div className="news-detail-category">
              <i className={getCategoryIcon(news.category)}></i>
              <span>{getCategoryName(news.category)}</span>
            </div>
            
            <h1 className="news-detail-title">{news.title}</h1>
            
            <div className="news-detail-meta">
              <div className="news-detail-date">
                <i className="far fa-calendar-alt"></i>
                <span>{formatDate(news.date)}</span>
              </div>
            </div>
          </div>
          
          <div className="news-detail-image">
            <img 
              src={news.image} 
              alt={news.title}
            />
          </div>
          
          <div className="news-detail-content">
            {news.content ? news.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            )) : <p>Содержание отсутствует</p>}
          </div>
          
          <div className="news-detail-actions">
            <div className="news-detail-action-group">
              <button 
                className={`news-detail-action-btn ${isLiked() ? 'liked' : ''}`} 
                onClick={handleLike}
              >
                <i className={`${isLiked() ? 'fas' : 'far'} fa-heart`}></i>
                <span>{news.likes || 0} лайков</span>
              </button>
              
              <button 
                className={`news-detail-action-btn ${isFavorite() ? 'favorited' : ''} ${removingFavorite ? 'remove-favorite' : ''}`} 
                onClick={handleFavorite}
              >
                <i className={`${isFavorite() ? 'fas' : 'far'} fa-bookmark`}></i>
                <span>{isFavorite() ? 'В избранном' : 'В избранное'}</span>
              </button>
            </div>
            
            <div className="news-detail-reactions">
              {['laugh', 'surprise', 'sad', 'angry'].map(reaction => (
                <button 
                  key={reaction}
                  className={`news-detail-reaction ${getUserReaction() === reaction ? 'active' : ''}`}
                  onClick={() => handleReaction(reaction)}
                >
                  <i className={`far fa-${
                    reaction === 'laugh' ? 'laugh-beam' : 
                    reaction === 'surprise' ? 'surprise' : 
                    reaction === 'sad' ? 'sad-tear' : 
                    'angry'
                  }`}></i>
                  {news.reactions[reaction] > 0 && (
                    <span className="news-detail-reaction-count">{news.reactions[reaction]}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="news-detail-share">
            <h3>Поделиться новостью</h3>
            <div className="share-buttons">
              <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(news.title + ' ' + window.location.href)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="share-button whatsapp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
              
              <a 
                href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="share-button telegram"
              >
                <i className="fab fa-telegram-plane"></i>
              </a>
              
              <a 
                href={`https://vk.com/share.php?url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(news.title)}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="share-button vk"
              >
                <i className="fab fa-vk"></i>
              </a>
            </div>
          </div>
          
          <a href="/" className="back-to-home">
            <i className="fas fa-arrow-left"></i>
            <span>Вернуться на главную</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail; 