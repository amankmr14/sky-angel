import { useState } from "react";

import GameOver from "./components/GameOver";
import GameScreen from "./components/GameScreen";

import "./App.css";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [finalScore, setFinalScore] = useState({ time: 0, stars: 0 })

  if (gameOver) return <GameOver finalScore={finalScore} setGameOver={setGameOver} setFinalScore={setFinalScore}/>;
  return <GameScreen setGameOver={setGameOver} setFinalScore={setFinalScore}/>;
}

export default App;
