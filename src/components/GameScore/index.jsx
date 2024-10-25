import { formatTime } from "../../utils";

const GameCounter = ({ fuel, star, time }) => {

  return (
    <div className="score__container">
      <p>🕐: {formatTime(time)}</p>
      <p>⛽: {fuel}</p>
      <p>⭐: {star}</p>
    </div>
  );
};

export default GameCounter;
