import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GamePageMatrix.css';


const GamePageMatrix = () => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('3x2');
  const [scale, setScale] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCells, setActiveCells] = useState([]);
  
  const gridSizes = [
    { label: '3x2', value: '3x2', height: 3, width: 2 },
    { label: '6x3', value: '6x3', height: 6, width: 3 },
    { label: '9x4', value: '9x4', height: 9, width: 4 },
    { label: '12x5', value: '12x5', height: 12, width: 5 },
    { label: '15x6', value: '15x6', height: 15, width: 6 },
  ];

  const selectedSizeObj = gridSizes.find(size => size.value === selectedSize);
  const { height, width } = selectedSizeObj;

  const getCellSize = (sizeValue) => {
    switch(sizeValue) {
      case '15x6':
        return 45;
      case '12x5':
        return 50;
      case '9x4':
        return 55;
      case '6x3':
        return 60;
      case '3x2':
        return 70;
      default:
        return 60;
    }
  };

  useEffect(() => {
    const calculateScale = () => {
      const containerHeight = window.innerHeight - 300;
      const containerWidth = window.innerWidth - 32;
      
      const cellSize = getCellSize(selectedSize);
      const cellGap = 4;
      
      const gridWidth = (width * cellSize) + ((width - 1) * cellGap);
      const gridHeight = (height * cellSize) + ((height - 1) * cellGap);
      
      const scaleX = containerWidth / gridWidth;
      const scaleY = containerHeight / gridHeight;
      
      const getMaxScale = () => {
        switch(selectedSize) {
          case '15x6':
            return 0.9;
          case '12x5':
            return 0.95;
          case '9x4':
            return 1;
          default:
            return 1;
        }
      };
      
      let newScale = Math.min(scaleX, scaleY, getMaxScale());
      newScale *= 0.95;
      
      setScale(newScale);
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [selectedSize, height, width]);

  const handlePlay = () => {
    setIsPlaying(true);
    setActiveCells([]);
    
    const rows = Array.from({ length: height }, (_, i) => height - 1 - i);
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < rows.length) {
        const currentRow = rows[currentIndex];
        const randomCol = Math.floor(Math.random() * width);
        const cellKey = `${currentRow}-${randomCol}`;
        setActiveCells(prev => [...prev, cellKey]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setActiveCells([]);
  };

  const renderGrid = () => {
    const rows = [];
    for (let i = 0; i < height; i++) {
      const cells = [];
      for (let j = 0; j < width; j++) {
        const cellKey = `${i}-${j}`;
        cells.push(
          <div 
            key={cellKey} 
            className={`matrix-cell ${activeCells.includes(cellKey) ? 'active' : ''}`}
            style={{
              width: `${getCellSize(selectedSize)}px`,
              height: `${getCellSize(selectedSize)}px`
            }}
          />
        );
      }
      rows.push(
        <div key={i} className="matrix-row">
          {cells}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="matrix-game">
      <div className="matrix-particles">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="size-selector">
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className={`size-dropdown ${isPlaying ? 'disabled' : ''}`}
          disabled={isPlaying}
        >
          {gridSizes.map(size => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="matrix-grid-container">
        <div 
          className="matrix-grid" 
          style={{ 
            transform: `scale(${scale})`,
            transformOrigin: 'center center'
          }}
        >
          {renderGrid()}
        </div>
      </div>

      <div className="game-controls">
        <button 
          className="control-button play"
          onClick={handlePlay}
          disabled={isPlaying}
        >
          Play
        </button>
        <button 
          className="control-button reset"
          onClick={handleReset}
        >
          Reset
        </button>
        <button 
          className="control-button back"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default GamePageMatrix; 
