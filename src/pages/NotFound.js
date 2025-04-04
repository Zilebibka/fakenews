import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import './NotFound.css';

const NotFound = () => {
  const { theme } = useTheme();

  return (
    <div className="not-found-container">
      <div className="not-found-decoration top-left">
        <i className="fas fa-newspaper"></i>
      </div>
      
      <div className="not-found-icon">
        <i className="fas fa-exclamation-circle"></i>
      </div>
      
      <h1 className="not-found-title">404</h1>
      <h2 className="not-found-subtitle">
        Упс! Страница, которую вы ищете, не существует или была перемещена.
      </h2>
      
      <Link to="/" className="back-home-btn">
        <i className="fas fa-home"></i>
        Вернуться на главную
      </Link>
      
      <div className="not-found-decoration bottom-right">
        <i className="fas fa-newspaper"></i>
      </div>
    </div>
  );
};

export default NotFound; 