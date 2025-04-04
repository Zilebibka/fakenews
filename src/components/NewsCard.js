import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useNews } from '../hooks/useNews';
import { useTheme } from '../hooks/useTheme';
import './NewsCard.css';

const NewsCard = ({ news, showDeleteButton = false, onDelete }) => {
  const { currentUser } = useAuth();
  const { likeNews, addToFavorites, removeFromFavorites, reactToNews, deleteNews } = useNews();
  const { theme } = useTheme();
  const [removingFavorite, setRemovingFavorite] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  
  // Форматирование даты
  const formatDate = (dateString) => {
    if (!dateString) return 'Дата не указана';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };
  
  // Проверка, лайкнул ли пользователь новость
  const isLiked = () => {
    if (!currentUser || !news?.likedBy) return false;
    return news.likedBy.includes(currentUser.uid);
  };
  
  // Проверка, добавлена ли новость в избранное
  const isFavorite = () => {
    if (!currentUser || !news?.favoritedBy) return false;
    return news.favoritedBy.includes(currentUser.uid);
  };
  
  // Обработчик лайка
  const handleLike = () => {
    if (currentUser) {
      likeNews(news.id);
    } else {
      alert('Пожалуйста, войдите в систему, чтобы поставить лайк');
    }
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
      }, 500);
    } else {
      addToFavorites(news.id);
    }
  };
  
  // Обработчик реакции
  const handleReaction = (reaction) => {
    if (currentUser) {
      reactToNews(news.id, reaction);
    } else {
      alert('Пожалуйста, войдите в систему, чтобы добавить реакцию');
    }
  };
  
  // Обработчик удаления новости
  const handleDelete = () => {
    if (window.confirm('Вы действительно хотите удалить эту новость?')) {
      setIsRemoving(true);
      setTimeout(() => {
        if (onDelete) {
          onDelete(news.id);
        } else {
          deleteNews(news.id);
        }
      }, 500);
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
        return category;
    }
  };

  // Проверка на наличие объекта новости
  if (!news) {
    return (
      <div className="news-card news-card-placeholder">
        <div className="news-card-content">
          <h3 className="news-card-title">Новость не найдена</h3>
          <p className="news-card-excerpt">Информация о новости отсутствует или была удалена.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`news-card ${isRemoving ? 'removing' : ''}`}>
      <div className="news-card-image">
        <img src={news.image || '/images/placeholder.jpg'} alt={news.title || 'Новость'} />
        <div className="news-card-category">
          <i className={getCategoryIcon(news.category)}></i>
          {getCategoryName(news.category)}
        </div>
      </div>
      
      {showDeleteButton && (
        <button 
          className="delete-news-btn"
          onClick={handleDelete}
          aria-label="Удалить новость"
        >
          <i className="fas fa-times"></i>
        </button>
      )}
      
      <div className="news-card-content">
        <h3 className="news-card-title">{news.title || 'Без заголовка'}</h3>
        <div className="news-card-date">
          <i className="far fa-calendar-alt"></i>
          {formatDate(news.date)}
        </div>
        <p className="news-card-excerpt">{news.content ? news.content.substring(0, 150) + '...' : 'Содержание отсутствует'}</p>
        
        <div className="news-card-actions">
          <div>
            <button 
              className={`news-card-action-btn ${isLiked() ? 'liked' : ''}`} 
              onClick={handleLike}
            >
              <i className={`${isLiked() ? 'fas' : 'far'} fa-heart`}></i>
              {news.likes || 0}
            </button>
          </div>
          <div>
            <button 
              className={`news-card-action-btn ${isFavorite() ? 'favorited' : ''} ${removingFavorite ? 'remove-favorite' : ''}`} 
              onClick={handleFavorite}
            >
              <i className={`${isFavorite() ? 'fas' : 'far'} fa-bookmark`}></i>
              {isFavorite() ? 'В избранном' : 'В избранное'}
            </button>
          </div>
        </div>
        
        <Link to={`/news/${news.id}`} className="read-more-link">
          Читать далее <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default NewsCard; 