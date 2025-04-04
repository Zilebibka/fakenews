import React from 'react';
import { useTheme } from '../hooks/useTheme';
import './Footer.css';

const Footer = () => {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className={`footer ${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="container footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>FakeNews Generator</h3>
            <p>Генератор фейковых новостей для развлечения и образовательных целей.</p>
          </div>
          
          <div className="footer-section">
            <h3>Категории</h3>
            <ul>
              <li>Политика</li>
              <li>Технологии</li>
              <li>Спорт</li>
              <li>Развлечения</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Поделиться</h3>
            <div className="social-icons">
              <a href="https://api.whatsapp.com/send?text=Проверьте%20этот%20генератор%20фейковых%20новостей!" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="https://t.me/share/url?url=https://fakenews.ru&text=Проверьте%20этот%20генератор%20фейковых%20новостей!" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <i className="fab fa-telegram-plane"></i>
              </a>
              <a href="https://vk.com/share.php?url=https://fakenews.ru&title=Проверьте%20этот%20генератор%20фейковых%20новостей!" target="_blank" rel="noopener noreferrer" aria-label="VK">
                <i className="fab fa-vk"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {year} FakeNews Generator. Все права защищены.</p>
          <p className="disclaimer">Это приложение создано в образовательных целях. Все новости являются вымышленными.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 