import { useContext } from 'react';
import { NewsContext } from '../contexts/NewsContext';

export const useNews = () => {
  return useContext(NewsContext);
};

// Функция для получения случайного изображения для категории
const getCategoryImage = (category) => {
  const images = {
    politics: [
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600',
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600',
      'https://images.unsplash.com/photo-1575320181282-9afab399332c?w=600'
    ],
    technology: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600'
    ],
    sports: [
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600',
      'https://images.unsplash.com/photo-1552667466-07770ae110d0?w=600'
    ],
    entertainment: [
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600',
      'https://images.unsplash.com/photo-1603190287605-e6ade32fa852?w=600',
      'https://images.unsplash.com/photo-1603736087997-20bdb73e8e08?w=600'
    ]
  };
  
  const categoryImages = images[category] || images.politics;
  return categoryImages[Math.floor(Math.random() * categoryImages.length)];
}; 