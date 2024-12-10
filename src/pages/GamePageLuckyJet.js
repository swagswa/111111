import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1win from "../assets/image1.png";
import image2 from "../assets/image2.png";
import './GamePage.css';

const GamePageLuckyJet = () => {
  const [number, setNumber] = useState(1.00);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const startAnimation = () => {
    setIsAnimating(true);
    setIsButtonDisabled(true);
    setNumber(1.00);
    
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 7000);

    const count = parseInt(localStorage.getItem("pageCount")) || 0;
    const newCount = count + 1;
    localStorage.setItem("pageCount", newCount);

    let rangeMax = 2;
    if (newCount % 25 === 0) {
      rangeMax = 74;
    } else if (newCount % 15 === 0) {
      rangeMax = 20;
    } else if (newCount % 10 === 0) {
      rangeMax = 5;
    } else if (newCount % 4 === 0) {
      rangeMax = 3;
    }

    const randomTarget = 1 + Math.random() * (rangeMax - 1);
    let intervalSpeed = 3;
    let currentWhole = 1;
    let currentDecimal = 0;
    let stepSize = 2;
    let intervalId = null;

    const updateNumber = () => {
      if (currentWhole + currentDecimal / 100 < randomTarget) {
        if (currentWhole >= 5) {
          stepSize = 8;
          intervalSpeed = 1;
        } else if (currentWhole >= 3) {
          stepSize = 5;
          intervalSpeed = 2;
        } else if (currentWhole >= 2) {
          stepSize = 3;
          intervalSpeed = 2;
        }

        currentDecimal += stepSize;
        if (currentDecimal >= 99) {
          currentWhole++;
          currentDecimal = 0;
        }
        
        const newNumber = parseFloat(
          `${currentWhole}.${currentDecimal < 10 ? "0" : ""}${currentDecimal}`
        );
        setNumber(newNumber);
        
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(updateNumber, intervalSpeed);
      } else {
        if (intervalId) clearInterval(intervalId);
        setIsAnimating(false);
      }
    };

    intervalId = setInterval(updateNumber, intervalSpeed);
  };

  const styles = {
    container: {
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(-45deg, #330000, #220000, #440000, #2b0000)',
      backgroundSize: '400% 400%',
      animation: 'gradientBG 15s ease infinite',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    backButton: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      background: 'none',
      border: 'none',
      color: '#ffffff',
      fontSize: 'clamp(12px, 2vw, 16px)',
      cursor: 'pointer',
      padding: 'clamp(6px, 1.5vw, 12px)',
      zIndex: 10,
    },

    logo: {
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'clamp(120px, 30vw, 220px)',
      height: 'auto',
      objectFit: 'contain',
      zIndex: 10,
    },

    content: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '0 20px',
      transform: 'translateX(-5%)',
    },

    numberContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      textAlign: 'center',
      marginBottom: 'clamp(20px, 4vw, 40px)',
      marginLeft: '-5%',
    },

    numberBox: {
      fontSize: 'clamp(32px, 8vw, 64px)',
      fontWeight: '800',
      color: '#ff3333',
      textShadow: '0 0 10px rgba(255, 51, 51, 0.7)',
      marginBottom: 'clamp(12px, 3vw, 24px)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      letterSpacing: '2px',
    },

    status: {
      fontSize: 'clamp(16px, 4vw, 32px)',
      color: '#ff3333',
      marginBottom: 'clamp(24px, 5vw, 48px)',
      textShadow: '0 0 10px rgba(255, 51, 51, 0.5)',
    },

    analyzeButton: {
      backgroundColor: 'transparent',
      color: '#ff3333',
      border: '2px solid #ff3333',
      borderRadius: 'clamp(15px, 3vw, 30px)',
      padding: 'clamp(12px, 3vw, 24px) clamp(24px, 5vw, 48px)',
      fontSize: 'clamp(14px, 3.5vw, 28px)',
      fontWeight: '700',
      cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 0 15px rgba(255, 51, 51, 0.3)',
      letterSpacing: '1px',
      opacity: isButtonDisabled ? 0.5 : 1,
      pointerEvents: isButtonDisabled ? 'none' : 'auto',
      '&:hover': {
        backgroundColor: isButtonDisabled ? 'transparent' : 'rgba(255, 51, 51, 0.1)',
        boxShadow: isButtonDisabled ? '0 0 15px rgba(255, 51, 51, 0.3)' : '0 0 20px rgba(255, 51, 51, 0.5)',
      },
    },

    centerImage: {
      width: 'clamp(300px, 62.5vw, 500px)',
      height: 'auto',
      objectFit: 'contain',
      animation: 'float 3s ease-in-out infinite',
      marginBottom: 'clamp(15px, 4vw, 30px)',
      marginLeft: '-5%',
    },

    particles: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
    }
  };

  const keyframes = `
    @keyframes gradientBG {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    
    @keyframes moveUp {
      0% {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) scale(0.5);
        opacity: 0;
      }
    }
  `;

  const Particles = () => {
    return (
      <div style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        pointerEvents: 'none'
      }}>
        {Array.from({ length: 50 }).map((_, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              bottom: '-2px',
              width: '3px',
              height: '3px',
              backgroundColor: `rgba(255, ${Math.random() * 100 + 100}, 0, ${Math.random() * 0.5 + 0.5})`,
              borderRadius: '50%',
              animation: `moveUp ${2 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
              pointerEvents: 'none'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.container}>
        <Particles />
        <button 
          style={styles.backButton}
          onClick={() => navigate(-1)}
        >
          ← BACK
        </button>
        
        <img 
          src={image1win} 
          alt="Logo" 
          style={styles.logo}
        />
        
        <img 
          src={image2} 
          alt="Character" 
          style={styles.centerImage}
        />
        
        <div style={styles.numberContainer}>
          <div style={styles.numberBox}>
            X {number.toFixed(2)}
          </div>
        </div>
        
        <div style={styles.status}>
          {isAnimating ? "Analyzing..." : "Your Result"}
        </div>
        
        <button 
          style={{
            ...styles.analyzeButton,
            opacity: isButtonDisabled ? 0.5 : 1,
            cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
            pointerEvents: isButtonDisabled ? 'none' : 'auto'
          }}
          onClick={startAnimation}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? "WAIT..." : "ANALYZE"}
        </button>
      </div>
    </>
  );
};

export default GamePageLuckyJet;
