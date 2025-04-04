import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Проверяем, есть ли пользователь в localStorage при загрузке
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Регистрация пользователя
  const register = (username, email, password) => {
    // Проверяем, существует ли пользователь с таким email
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(user => user.email === email);
    
    if (existingUser) {
      throw new Error('Пользователь с таким email уже существует');
    }

    // Создаем нового пользователя
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // В реальном приложении пароль должен быть захеширован
      preferences: {
        themes: ['politics', 'technology', 'sports', 'entertainment'],
        favoriteNews: []
      },
      createdAt: new Date().toISOString()
    };

    // Добавляем пользователя в список пользователей
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Устанавливаем текущего пользователя
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));

    return newUser;
  };

  // Вход пользователя
  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.email === email && user.password === password);
    
    if (!user) {
      throw new Error('Неверный email или пароль');
    }

    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  };

  // Выход пользователя
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  // Обновление данных пользователя
  const updateUser = (userData) => {
    const updatedUser = { ...currentUser, ...userData };
    
    // Обновляем пользователя в списке пользователей
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = users.map(user => 
      user.id === currentUser.id ? updatedUser : user
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    setCurrentUser(updatedUser);
    
    return updatedUser;
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; 