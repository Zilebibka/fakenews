import React, { useEffect, useState } from 'react';
import './LoadingAnimation.css';
import logo from '../assets/logo.svg';
import LogoComponent from '../assets/logo.jsx';

const LoadingAnimation = ({ onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [useJsxLogo, setUseJsxLogo] = useState(false);
  
  // Создаем фиксированный массив букв
  const letters = ['F', 'a', 'k', 'e', 'N', 'e', 'w', 's'];

  useEffect(() => {
    // Проверяем, можем ли использовать CSS-анимацию
    // Если возникли какие-то проблемы, будем использовать запасной вариант
    const checkAnimation = setTimeout(() => {
      const letterElements = document.querySelectorAll('.animated-letter');
      if (letterElements.length === 0) {
        console.log('Элементы анимации не найдены, переключаемся на JSX-версию');
        setUseJsxLogo(true);
      } else if (window.getComputedStyle(letterElements[0]).opacity === '0') {
        console.log('Анимация не работает, переключаемся на запасной вариант');
        setUseFallback(true);
      } else {
        console.log('Анимация работает корректно');
      }
    }, 500);

    // Настраиваем таймер для анимации
    const animationDuration = 3000; // 3 секунды для анимации
    const fadeOutDuration = 800; // 0.8 секунд для затухания
    
    // Таймер для начала затухания
    const fadeTimer = setTimeout(() => {
      console.log('Начинаю затухание анимации');
      setIsFading(true);
      
      // Таймер для полного скрытия анимации
      setTimeout(() => {
        console.log('Полностью скрываю анимацию');
        setIsVisible(false);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, fadeOutDuration);
      
    }, animationDuration);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(checkAnimation);
    };
  }, [onAnimationComplete]);

  // Если анимация не видна, не рендерим ничего
  if (!isVisible) return null;

  return (
    <div className={`loading-animation ${isFading ? 'fade-out' : ''}`}>
      {useJsxLogo ? (
        <div className="jsx-logo-container">
          <LogoComponent />
        </div>
      ) : useFallback ? (
        <div className="fallback-logo">
          <img src={logo} alt="FakeNews" className="logo-svg" />
        </div>
      ) : (
        <div className="letters-container">
          {letters.map((letter, index) => (
            <div key={index} className="letter-wrapper">
              <span 
                className="animated-letter"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {letter}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoadingAnimation; 