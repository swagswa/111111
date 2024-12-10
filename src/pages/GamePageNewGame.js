import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GamePage.css';

const GamePageNewGame = () => {
  const navigate = useNavigate();
  const [stars, setStars] = useState(Array(25).fill(false));
  const [mineCount, setMineCount] = useState(3);
  const STAR_COUNT = 5;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const getSignal = () => {
    if (isButtonDisabled) return;

    setStars(Array(25).fill(false));
    
    const positions = [];
    while (positions.length < STAR_COUNT) {
      const pos = Math.floor(Math.random() * 25);
      if (!positions.includes(pos)) {
        positions.push(pos);
      }
    }
    
    positions.forEach((pos, index) => {
      setTimeout(() => {
        setStars(prevStars => {
          const newStars = [...prevStars];
          newStars[pos] = true;
          return newStars;
        });
      }, index * 500);
    });

    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 3000);
  };

  const handleDecrease = () => {
    if (mineCount > 3) {
      setMineCount(prev => prev - 1);
      const display = document.querySelector('.game6-mines-display');
      display.classList.add('pulse');
      setTimeout(() => display.classList.remove('pulse'), 300);
    }
  };

  const handleIncrease = () => {
    if (mineCount < 7) {
      setMineCount(prev => prev + 1);
      const display = document.querySelector('.game6-mines-display');
      display.classList.add('pulse');
      setTimeout(() => display.classList.remove('pulse'), 300);
    }
  };

  return (
    <div className="game-container game6-container">
      <div className="game6-shooting-star"></div>
      <div className="game6-shooting-star"></div>
      <div className="game6-shooting-star"></div>
      
      <button className="game6-back-button game6-button" onClick={() => navigate(-1)}>
        ← BACK
      </button>
      
      <div className="grid">
        {stars.map((hasStar, index) => (
          <div key={index} className="grid-item">
            {hasStar && <span className="star">⭐</span>}
          </div>
        ))}
      </div>

      <div className="mines-control">
        <button 
          className="game6-control-button game6-button"
          onClick={handleDecrease}
          disabled={mineCount <= 3}
        >
          −
        </button>
        <div className="game6-mines-display">{mineCount}</div>
        <button 
          className="game6-control-button game6-button"
          onClick={handleIncrease}
          disabled={mineCount >= 7}
        >
          +
        </button>
      </div>

      <button 
        className="game6-signal-button game6-button"
        onClick={getSignal}
        disabled={isButtonDisabled}
      >
        {isButtonDisabled ? "WAIT..." : "GET SIGNAL"}
      </button>
    </div>
  );
};

export default GamePageNewGame; 