import React from 'react';
import './MainPage.css';

const MainPage = () => {
  return (
    <div className="root">
      <div className="container">
        {/* Контейнер для первого изображения */}
        <div className="first-image-container">
          <div className="game-card">
            <img src="/images/image1.png" alt="Game 1" />
          </div>
        </div>
        
        {/* Контейнер для остальных изображений */}
        <div className="other-images-container">
          <div className="game-card">
            <img src="/images/image2.png" alt="Game 2" />
          </div>
          <div className="game-card">
            <img src="/images/image3.png" alt="Game 3" />
          </div>
          <div className="game-card">
            <img src="/images/image4.png" alt="Game 4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage; 