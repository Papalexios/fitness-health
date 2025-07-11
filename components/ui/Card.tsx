import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 shadow-xl shadow-black/30 bg-stone-900/70 backdrop-blur-xl ${className}`}
    >
      <div className="absolute inset-[-2px] bg-gradient-to-br from-stone-700/80 via-stone-800/50 to-transparent rounded-2xl"></div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;