import { useEffect, useRef, useState } from "react";

import CircularLoader from "../Loader";
import { formatTime } from "../../utils";

import gameOverAudio from "../../assets/loos.wav";
import "./GameOver.css";

const GameOver = ({ finalScore, setGameOver, setFinalScore }) => {
  const gameOverAudioRef = useRef(null);
  const [page, setPage] = useState(1);
  const [userName, setUserName] = useState("");
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };

  const handleRestart = () => {
    setGameOver(false)
    setFinalScore({ time: 0, stars: 0 })
  }

  const handleSubmit = async () => {
    const newData = {
      name: userName,
      time: finalScore.time,
      stars: finalScore.stars,
    };

    const localData = JSON.parse(localStorage.getItem("userDataArray")) || [];
    const updatedLocalData = [...localData, { ...newData, id: Date.now() }];
    localStorage.setItem("userDataArray", JSON.stringify(updatedLocalData));

    let serverData = [];
    try {
      setLoading(true)
      const response = await fetch("http://xxxxxxxxx/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!response.ok) {
        throw new Error("Server responded with an error");
      }

      serverData = await response.json();
    } catch (error) {
      console.error("Error submitting data to server:", error);
    }
    setLoading(false)
    const combinedData = [...serverData, ...updatedLocalData];
    const sortedData = combinedData.sort((a, b) => {
      if (b.stars !== a.stars) {
        return b.stars - a.stars;
      }
      return b.time - a.time;
    });

    setRankingData(sortedData);
    setPage(2);
  };

  useEffect(() => {
    gameOverAudioRef.current.play();
  }, []);

  return (
    <div className="gameover__wrapper">
      <div className="gameover__container">
        {page === 1 ? (
          <>
            <h1>Game Over</h1>
            <p>
              🕐: {formatTime(finalScore.time)} ⭐: {finalScore.stars ?? 0}
            </p>
            <input
              type="text"
              placeholder="Enter Name"
              value={userName}
              onChange={handleInputChange}
            />
            <div>
              <button
                className="gameover__button"
                disabled={!userName || loading}
                onClick={handleSubmit}
              >
                {loading ? <CircularLoader /> : ">"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="ranking__container">
              {rankingData?.map((item, index) => (
                <p key={item?.id}>
                  <span>
                    {index + 1}. {item.name}
                  </span>
                  <span>
                    🕐: {formatTime(item.time)} ⭐: {item.stars ?? 0}
                  </span>
                </p>
              ))}
            </div>
            <button
              className="restart__button"
              onClick={handleRestart}
            >
              Start Game
            </button>
          </>
        )}
      </div>

      <audio ref={gameOverAudioRef}>
        <source src={gameOverAudio} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default GameOver;
