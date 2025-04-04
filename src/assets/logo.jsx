import React from 'react';

const Logo = () => {
  const letters = [
    { letter: 'F', color: '#2196f3' },
    { letter: 'a', color: '#f50057' },
    { letter: 'k', color: '#2196f3' },
    { letter: 'e', color: '#f50057' },
    { letter: 'N', color: '#2196f3' },
    { letter: 'e', color: '#f50057' },
    { letter: 'w', color: '#2196f3' },
    { letter: 's', color: '#f50057' }
  ];

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {letters.map((item, index) => (
        <span
          key={index}
          style={{
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontSize: '5rem',
            fontWeight: 800,
            color: item.color,
            animation: `fadeIn 0.3s ease-in-out forwards`,
            animationDelay: `${index * 0.1}s`,
            opacity: 0,
            display: 'inline-block',
            margin: '0 2px',
            textShadow: `0 0 10px ${item.color}33`
          }}
        >
          {item.letter}
        </span>
      ))}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Logo;