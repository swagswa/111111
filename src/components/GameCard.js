import React from "react";
import { Link } from "react-router-dom";

const GameCard = ({ image, title, link }) => {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div className="game-card">
        <img src={image} alt={title} />
      </div>
    </Link>
  );
};

export default GameCard;