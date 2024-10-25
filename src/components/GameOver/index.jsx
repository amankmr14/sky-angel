import { useState } from "react";
import { formatTime } from "../../utils";

import "./GameOver.css";

const GameOver = ({finalScore}) => {
  const [userName, setUserName] = useState("");

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <div className="gameover__wrapper">
      <div className="gameover__container">
        <h1>Game Over</h1>
        <p>🕐: {formatTime(finalScore.time)} ⭐: {finalScore.stars ?? 0}</p>
        <input
          type="text"
          placeholder="Enter Name"
          value={userName}
          onChange={handleInputChange}
        />
        <div>
          <button className="gameover__button" disabled={!userName}>{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
