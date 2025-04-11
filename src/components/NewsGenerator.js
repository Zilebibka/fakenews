import React, { useState } from 'react';
import { generateTitle, generateContent } from '../utils/generators';
import './NewsGenerator.css';

const categories = ['Politics', 'Technology', 'Sports', 'Entertainment'];

const NewsGenerator = ({ onNewsGenerated }) => {
  const [category, setCategory] = useState(categories[0]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const title = await generateTitle(category);
      const content = await generateContent(category);
      const image = `https://source.unsplash.com/800x400/?${category.toLowerCase()}`;
      
      const newNews = {
        id: Date.now(),
        title,
        content,
        image,
        category,
        date: new Date().toISOString(),
        likes: 0,
        liked: false
      };

      onNewsGenerated(newNews);
    } catch (error) {
      console.error('Error generating news:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="news-generator">
      <h2 className="news-generator__title">Generate Fake News</h2>
      <div className="news-generator__controls">
        <select 
          className="news-generator__select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button 
          className="news-generator__button"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? 'Generating...' : 'Generate News'}
        </button>
      </div>
    </div>
  );
};

export default NewsGenerator; 