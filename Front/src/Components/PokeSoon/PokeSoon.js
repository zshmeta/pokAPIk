import React, { useState, useEffect } from "react";
import "./PokeSoon.css";

const PokeSoon = () => {
  const randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const [score, setScore] = useState(0);
  const [randomImage, setRandomImage] = useState(null);
  const [style, setStyle] = useState({});

  const spawnImage = () => {
    const imageName = String(randomNumber(1, 151)).padStart(3, "0");
    const posX = randomNumber(0, 90); // adjust as needed
    const posY = randomNumber(0, 80); // adjust as needed

    setRandomImage(`/assets/images/${imageName}.png`);
    setStyle({
      position: "absolute",
      left: `${posX}%`,
      top: `${posY}%`,
    });
  };

  const handleClick = () => {
    setScore((prevScore) => prevScore + 10);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      spawnImage();
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App">
      <div className="score" style={{ position: "fixed", top: "50px", left: "50px", fontSize: "55px" }}>{score} pts </div>
      {randomImage && (
        <img
          src={randomImage}
          alt="clique-moi!"
          onClick={handleClick}
          style={style}
        />
      )}
    </div>
  );
};

export default PokeSoon;