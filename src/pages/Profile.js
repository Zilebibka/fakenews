import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNews } from '../hooks/useNews';
import { useTheme } from '../hooks/useTheme';
import NewsCard from '../components/NewsCard';
import './Profile.css';

const Profile = () => {
  const { currentUser, updateUser } = useAuth();
  const { getFavoriteNews, removeFromFavorites } = useNews();
  const { theme } = useTheme();
  
  const [favoriteNews, setFavoriteNews] = useState([]);
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: ''
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [removingNewsId, setRemovingNewsId] = useState(null);
  
  // Загрузка избранных новостей и предпочтений пользователя
  useEffect(() => {
    if (currentUser) {
      setFavoriteNews(getFavoriteNews(currentUser.id));
      setSelectedThemes(currentUser.preferences?.themes || []);
      setFormData({
        username: currentUser.username,
        email: currentUser.email
      });
    }
  }, [currentUser, getFavoriteNews]);
  
  // Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Обработчик изменения выбранных тем
  const handleThemeChange = (theme) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter(t => t !== theme));
    } else {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };
  
  // Обработчик сохранения изменений
  const handleSaveChanges = () => {
    try {
      updateUser({
        username: formData.username,
        preferences: {
          ...currentUser.preferences,
          themes: selectedThemes
        }
      });
      
      setMessage({
        text: 'Изменения успешно сохранены',
        type: 'success'
      });
      
      setIsEditing(false);
      
      // Скрываем сообщение через 3 секунды
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    } catch (error) {
      setMessage({
        text: 'Ошибка при сохранении изменений',
        type: 'error'
      });
    }
  };
  
  // Обработчик удаления новости из избранного
  const handleRemoveFromFavorites = useCallback((newsId) => {
    if (!currentUser) return;
    
    // Устанавливаем ID удаляемой новости для анимации
    setRemovingNewsId(newsId);
    
    // Ждем завершения анимации перед удалением
    setTimeout(() => {
      removeFromFavorites(newsId);
      setFavoriteNews(prevNews => prevNews.filter(news => news.id !== newsId));
      setRemovingNewsId(null);
    }, 500);
  }, [currentUser, removeFromFavorites]);
  
  // Получение названия темы
  const getThemeName = (theme) => {
    if (!theme) return 'Разное';
    
    switch (theme) {
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
  
  // Получение иконки для темы
  const getThemeIcon = (theme) => {
    if (!theme) return 'fas fa-newspaper';
    
    switch (theme) {
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
  
  // Форматирование даты
  const formatDate = (dateString) => {
    if (!dateString) return 'Дата не указана';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <i className="fas fa-user-circle"></i>
        </div>
        <div className="profile-info">
          <h1>{currentUser?.username || 'Пользователь'}</h1>
          <div className="profile-email">
            <i className="fas fa-envelope"></i>
            <span>{currentUser?.email}</span>
          </div>
          <div className="profile-date">
            <i className="fas fa-calendar-alt"></i>
            <span>Зарегистрирован: {formatDate(currentUser?.createdAt)}</span>
          </div>
        </div>
        <button 
          className="edit-profile-btn"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <i className="fas fa-times"></i>
              <span>Отменить</span>
            </>
          ) : (
            <>
              <i className="fas fa-edit"></i>
              <span>Редактировать</span>
            </>
          )}
        </button>
      </div>
      
      {message.text && (
        <div className={`profile-message ${message.type}`}>
          <i className={message.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'}></i>
          <span>{message.text}</span>
        </div>
      )}
      
      <div className="profile-card">
        <h2>Настройки профиля</h2>
        
        {isEditing ? (
          <div className="profile-form">
            <div className="profile-form-group">
              <label className="profile-form-label" htmlFor="username">Имя пользователя</label>
              <input
                type="text"
                id="username"
                name="username"
                className="profile-form-control"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            
            <div className="profile-form-group">
              <label className="profile-form-label" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="profile-form-control"
                value={formData.email}
                disabled
              />
              <small>Email нельзя изменить</small>
            </div>
            
            <div className="profile-form-group">
              <label className="profile-form-label">Предпочитаемые темы</label>
              <div className="theme-options">
                {['politics', 'technology', 'sports', 'entertainment'].map(theme => (
                  <button
                    key={theme}
                    className={`theme-option ${selectedThemes.includes(theme) ? 'selected' : ''}`}
                    onClick={() => handleThemeChange(theme)}
                  >
                    <i className={getThemeIcon(theme)}></i>
                    <span>{getThemeName(theme)}</span>
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              className="save-changes-btn"
              onClick={handleSaveChanges}
            >
              <i className="fas fa-save"></i>
              <span>Сохранить изменения</span>
            </button>
          </div>
        ) : (
          <div className="profile-info">
            <div className="profile-info-item">
              <label className="profile-info-label">Имя пользователя:</label>
              <div className="profile-info-value">{currentUser?.username}</div>
            </div>
            
            <div className="profile-info-item">
              <label className="profile-info-label">Email:</label>
              <div className="profile-info-value">{currentUser?.email}</div>
            </div>
            
            <div className="profile-info-item">
              <label className="profile-info-label">Предпочитаемые темы:</label>
              <div className="theme-options">
                {selectedThemes && selectedThemes.length > 0 ? (
                  selectedThemes.map(theme => (
                    <div key={theme} className="theme-option selected">
                      <i className={getThemeIcon(theme)}></i>
                      <span>{getThemeName(theme)}</span>
                    </div>
                  ))
                ) : (
                  <div className="profile-info-value">Не выбрано</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="favorite-news-section">
        <h2>Избранные новости</h2>
        
        {favoriteNews && favoriteNews.length > 0 ? (
          <div className="favorite-news-grid">
            {favoriteNews.map(news => (
              <div 
                key={news.id} 
                className={`favorite-news-item ${removingNewsId === news.id ? 'removing' : ''}`}
              >
                <NewsCard news={news} />
                <button 
                  className="remove-favorite-btn"
                  onClick={() => handleRemoveFromFavorites(news.id)}
                  aria-label="Удалить из избранного"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-favorites">
            <i className="far fa-bookmark"></i>
            <p>У вас пока нет избранных новостей</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 