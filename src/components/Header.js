import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`header ${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <h1>FakeNews</h1>
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/generator">Генератор</Link>
                </li>
                <li>
                  <Link to="/profile">Профиль</Link>
                </li>
                <li>
                  <button className="logout-btn" onClick={logout}>
                    Выйти
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Войти</Link>
                </li>
                <li>
                  <Link to="/register">Регистрация</Link>
                </li>
              </>
            )}
            <li>
              <button 
                className="theme-toggle" 
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
              >
                {theme === 'dark' ? (
                  <i className="fas fa-sun"></i>
                ) : (
                  <i className="fas fa-moon"></i>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 