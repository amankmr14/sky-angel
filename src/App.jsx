import { useEffect, useRef, useState } from "react";

import GameOver from "./components/GameOver";
import GameScreen from "./components/GameScreen";

import "./App.css";
import PlayPauseButton from "./components/PlayPauseButton";

function App() {
  const containerRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState({ time: 0, stars: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        setIsPaused((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted]);

  if (gameOver)
    return (
      <GameOver
        finalScore={finalScore}
        setGameOver={setGameOver}
        setFinalScore={setFinalScore}
      />
    );
  return (
    <div
      className={`game__container ${isPaused ? "paused" : ""}`}
      ref={containerRef}
    >
      {gameStarted ? (
        <>
          <PlayPauseButton isPaused={isPaused} setIsPaused={setIsPaused} />
          <GameScreen
            setGameOver={setGameOver}
            setFinalScore={setFinalScore}
            isPaused={isPaused}
            parentRef={containerRef}
          />
        </>
      ) : (
        <div className="start_game__container">
          <h1>Welcome to Sky Angel</h1>
          <button onClick={() => setGameStarted(true)}>Start Game</button>
        </div>
      )}
    </div>
  );
}

export default App;
