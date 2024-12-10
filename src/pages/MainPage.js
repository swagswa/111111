import React, { useEffect } from 'react';
import GameCard from '../components/GameCard';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';
import matrixImage from '../assets/images (1)-Photoroom (1)-Photoroom.png';
import './MainPage.css';

const MainPage = () => {
  // Создаем частицы при монтировании компонента
  useEffect(() => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.querySelector('.root').appendChild(particlesContainer);

    // Создаем только мерцающие звезды
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star-particle';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 4}s`;
      particlesContainer.appendChild(star);
    }

    return () => {
      particlesContainer.remove();
    };
  }, []);

  return (
    <div className="root">
      <img src={image1} alt="Logo" className="logo" />
      <div className="container">
        <div className="main">
          <GameCard
            image={image4}
            title="JetX"
            link="/game3"
            theme="blue"
          />
          <GameCard
            image={image2}
            title="LuckyJet"
            link="/game1"
            theme="red"
          />
          <GameCard
            image={image3}
            title="SpaceX"
            link="/game2"
            theme="gold"
          />
          <GameCard
            image={matrixImage}
            title="Matrix"
            link="/game4"
            theme="green"
          />
          <GameCard
            image={image5}
            title="Rocket Queen"
            link="/game5"
            theme="purple"
          />
          <GameCard
            image={image6}
            title="New Game"
            link="/game6"
            theme="orange"
          />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
