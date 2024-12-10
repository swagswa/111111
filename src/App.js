import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import GamePageLuckyJet from './pages/GamePageLuckyJet';
import GamePageSpaceX from './pages/GamePageSpaceX';
import GamePageJetX from './pages/GamePageJetX';
import GamePageMatrix from './pages/GamePageMatrix';
import GamePageRocketQueen from './pages/GamePageRocketQueen';
import GamePageNewGame from './pages/GamePageNewGame';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/game1" element={<GamePageLuckyJet />} />
        <Route path="/game2" element={<GamePageSpaceX />} />
        <Route path="/game3" element={<GamePageJetX />} />
        <Route path="/game4" element={<GamePageMatrix />} />
        <Route path="/game5" element={<GamePageRocketQueen />} />
        <Route path="/game6" element={<GamePageNewGame />} />
      </Routes>
    </Router>
  );
}

export default App;