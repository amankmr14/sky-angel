import './PlayPauseButton.css';

const PlayPauseButton = ({ isPaused, setIsPaused }) => {

  const handleClick = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div
      className={`play-pause-button ${isPaused ? 'paused' : 'playing'}`}
      onClick={handleClick}
    >
      {isPaused ? (
        <span className="pause-icon">❚❚</span>
      ) : (
        <span className="play-icon">▶</span>
      )}
    </div>
  );
};

export default PlayPauseButton;
