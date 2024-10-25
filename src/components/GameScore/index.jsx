const GameCounter = ({ fuel, star, time }) => {
  
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };
  return (
    <div className="score__container">
      <p>🕐: {formatTime(time)}</p>
      <p>⛽: {fuel}</p>
      <p>⭐: {star}</p>
    </div>
  );
};

export default GameCounter;
