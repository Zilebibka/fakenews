import React, { createContext, useState, useEffect } from 'react';
import { generateNewsTitle } from '../utils/titleGenerator';
import { generateNewsContent } from '../utils/contentGenerator';
import { getImageForNews } from '../utils/imageGenerator';

export const NewsContext = createContext();

export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Загружаем новости из localStorage при инициализации
  useEffect(() => {
    const savedNews = localStorage.getItem('news');
    if (savedNews) {
      setNews(JSON.parse(savedNews));
    }
    setLoading(false);
  }, []);

  // Сохраняем новости в localStorage при изменении
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('news', JSON.stringify(news));
    }
  }, [news, loading]);

  // Генерация новой новости
  const generateNews = (category) => {
    // Убедимся, что категория существует или выберем случайную
    const validCategories = ['politics', 'technology', 'sports', 'entertainment'];
    const selectedCategory = category && validCategories.includes(category) 
      ? category 
      : validCategories[Math.floor(Math.random() * validCategories.length)];
    
    const title = generateNewsTitle(selectedCategory);
    const content = generateNewsContent(title, selectedCategory);
    const image = getImageForNews(title, selectedCategory);

    const newNews = {
      id: Date.now().toString(),
      title,
      content,
      image,
      category: selectedCategory,
      date: new Date().toISOString(),
      likes: 0,
      likedBy: [],
      favoritedBy: [],
      reactedBy: {},
      reactions: {
        laugh: 0,
        surprise: 0,
        sad: 0,
        angry: 0
      },
      comments: []
    };

    setNews(prevNews => [newNews, ...prevNews]);
    return newNews;
  };

  // Получение новости по ID
  const getNewsById = (id) => {
    return news.find(item => item.id === id) || null;
  };

  // Добавление лайка к новости
  const likeNews = (id) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) return;
    
    const userId = currentUser.uid || currentUser.id;
    
    setNews(prevNews => 
      prevNews.map(item => {
        if (item.id === id) {
          // Проверяем, не лайкнул ли пользователь уже эту новость
          const likedBy = item.likedBy || [];
          if (likedBy.includes(userId)) {
            // Если уже лайкнул, то убираем лайк
            return {
              ...item,
              likes: item.likes - 1,
              likedBy: likedBy.filter(uid => uid !== userId)
            };
          } else {
            // Если еще не лайкнул, то добавляем лайк
            return {
              ...item,
              likes: (item.likes || 0) + 1,
              likedBy: [...likedBy, userId]
            };
          }
        }
        return item;
      })
    );
  };

  // Добавление реакции к новости
  const addReaction = (id, reaction, userId) => {
    setNews(prevNews => 
      prevNews.map(item => {
        if (item.id === id) {
          // Проверяем, не реагировал ли пользователь уже на эту новость
          const reactedBy = item.reactedBy || {};
          const userReaction = reactedBy[userId];
          
          // Если пользователь уже реагировал этой реакцией, то убираем ее
          if (userReaction === reaction) {
            const newReactedBy = { ...reactedBy };
            delete newReactedBy[userId];
            
            return {
              ...item,
              reactions: {
                ...item.reactions,
                [reaction]: item.reactions[reaction] - 1
              },
              reactedBy: newReactedBy
            };
          } 
          // Если пользователь реагировал другой реакцией, то меняем ее
          else if (userReaction) {
            return {
              ...item,
              reactions: {
                ...item.reactions,
                [userReaction]: item.reactions[userReaction] - 1,
                [reaction]: item.reactions[reaction] + 1
              },
              reactedBy: {
                ...reactedBy,
                [userId]: reaction
              }
            };
          } 
          // Если пользователь еще не реагировал, то добавляем реакцию
          else {
            return {
              ...item,
              reactions: {
                ...item.reactions,
                [reaction]: item.reactions[reaction] + 1
              },
              reactedBy: {
                ...reactedBy,
                [userId]: reaction
              }
            };
          }
        }
        return item;
      })
    );
  };
  
  // Новая функция для реакций
  const reactToNews = (id, reaction) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) return;
    
    const userId = currentUser.uid || currentUser.id;
    addReaction(id, reaction, userId);
  };

  // Добавление новости в избранное
  const addToFavorites = (newsId) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) return;
    
    const userId = currentUser.uid || currentUser.id;
    
    // Обновляем список избранных новостей в объекте новости
    setNews(prevNews => 
      prevNews.map(item => {
        if (item.id === newsId) {
          const favoritedBy = item.favoritedBy || [];
          if (!favoritedBy.includes(userId)) {
            return {
              ...item,
              favoritedBy: [...favoritedBy, userId]
            };
          }
        }
        return item;
      })
    );
    
    // Обновляем список избранных новостей пользователя
    const favoriteNews = currentUser.preferences?.favoriteNews || [];
    if (!favoriteNews.includes(newsId)) {
      const updatedUser = {
        ...currentUser,
        preferences: {
          ...currentUser.preferences,
          favoriteNews: [...favoriteNews, newsId]
        }
      };
      
      // Сохраняем обновленного пользователя
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Обновляем список пользователей
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(u => 
        u.id === userId || u.uid === userId ? updatedUser : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };
  
  // Удаление новости из избранного
  const removeFromFavorites = (newsId) => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) return;
    
    const userId = currentUser.uid || currentUser.id;
    
    // Обновляем список избранных новостей в объекте новости
    setNews(prevNews => 
      prevNews.map(item => {
        if (item.id === newsId) {
          const favoritedBy = item.favoritedBy || [];
          if (favoritedBy.includes(userId)) {
            return {
              ...item,
              favoritedBy: favoritedBy.filter(uid => uid !== userId)
            };
          }
        }
        return item;
      })
    );
    
    // Обновляем список избранных новостей пользователя
    const favoriteNews = currentUser.preferences?.favoriteNews || [];
    if (favoriteNews.includes(newsId)) {
      const updatedUser = {
        ...currentUser,
        preferences: {
          ...currentUser.preferences,
          favoriteNews: favoriteNews.filter(id => id !== newsId)
        }
      };
      
      // Сохраняем обновленного пользователя
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Обновляем список пользователей
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(u => 
        u.id === userId || u.uid === userId ? updatedUser : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };

  // Добавление новости в избранное (старая версия)
  const toggleFavorite = (newsId, userId) => {
    // Получаем пользователя из localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    // Проверяем, есть ли новость в избранном
    const favoriteNews = user.preferences?.favoriteNews || [];
    const isFavorite = favoriteNews.includes(newsId);

    // Обновляем список избранных новостей
    const updatedFavoriteNews = isFavorite
      ? favoriteNews.filter(id => id !== newsId)
      : [...favoriteNews, newsId];

    // Обновляем пользователя
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        favoriteNews: updatedFavoriteNews
      }
    };

    // Сохраняем обновленного пользователя
    localStorage.setItem('user', JSON.stringify(updatedUser));

    // Обновляем список пользователей
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === userId || u.uid === userId ? updatedUser : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    return updatedFavoriteNews;
  };

  // Получение избранных новостей пользователя
  const getFavoriteNews = (userId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return [];

    const favoriteNewsIds = user.preferences?.favoriteNews || [];
    return news.filter(item => favoriteNewsIds.includes(item.id));
  };

  // Фильтрация новостей по категориям
  const filterNewsByCategories = (categories) => {
    if (!categories || categories.length === 0) {
      return news;
    }
    return news.filter(item => categories.includes(item.category));
  };

  // Удаление новости
  const deleteNews = (newsId) => {
    if (!newsId) return;
    
    // Удаляем новость из списка
    setNews(prevNews => prevNews.filter(item => item.id !== newsId));
    
    // Также удаляем новость из избранного у всех пользователей
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(user => {
      if (user.preferences?.favoriteNews?.includes(newsId)) {
        return {
          ...user,
          preferences: {
            ...user.preferences,
            favoriteNews: user.preferences.favoriteNews.filter(id => id !== newsId)
          }
        };
      }
      return user;
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Обновляем текущего пользователя, если он есть
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser && currentUser.preferences?.favoriteNews?.includes(newsId)) {
      const updatedUser = {
        ...currentUser,
        preferences: {
          ...currentUser.preferences,
          favoriteNews: currentUser.preferences.favoriteNews.filter(id => id !== newsId)
        }
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    news,
    loading,
    generateNews,
    getNewsById,
    likeNews,
    addReaction,
    reactToNews,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    getFavoriteNews,
    filterNewsByCategories,
    deleteNews
  };

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
}; 