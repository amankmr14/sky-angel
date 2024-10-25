import { useCallback, useEffect, useRef, useState } from "react";

import Cloud from "../Cloud";
import Plane from "../Plane";
import Parachute from "../Parachute";
import GameCounter from "../GameScore";
import Star from "../Stars";
import Bird from "../Bird";
import PlayPauseButton from "../PlayPauseButton";

import audio from "../../assets/bgm.mp3";
import gameOverAudio from "../../assets/loos.wav";

function GameScreen({ setGameOver, setFinalScore }) {
  const containerRef = useRef(null);
  const planeRef = useRef(null);
  const chuteRef = useRef(null);
  const starRef = useRef(null);
  const birdRef = useRef(null);
  const audioRef = useRef(null);
  const gameOverAudioRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isStarVisible, setIsStarVisible] = useState(false);
  const [isBirdVisible, setIsBirdVisible] = useState(false);
  const [fuel, setFuel] = useState(10);
  const [starCount, setStarCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(0);

  const checkCollisionChute = useCallback(() => {
    if (planeRef.current && chuteRef.current) {
      const planeRect = planeRef.current.getBoundingClientRect();
      const chuteRect = chuteRef.current.getBoundingClientRect();

      const isColliding =
        planeRect.x < chuteRect.x + chuteRect.width &&
        planeRect.x + planeRect.width > chuteRect.x &&
        planeRect.y < chuteRect.y + chuteRect.height &&
        planeRect.y + planeRect.height > chuteRect.y;

      if (isColliding) {
        console.log("Collision detected!");
        setIsVisible(false);
        setFuel((prev) => prev + 10);
      }
    }
  }, []);

  const checkCollisionStar = useCallback(() => {
    if (planeRef.current && starRef.current) {
      const planeRect = planeRef.current.getBoundingClientRect();
      const starRect = starRef.current.getBoundingClientRect();

      const isColliding =
        planeRect.x < starRect.x + starRect.width &&
        planeRect.x + planeRect.width > starRect.x &&
        planeRect.y < starRect.y + starRect.height &&
        planeRect.y + planeRect.height > starRect.y;

      if (isColliding) {
        console.log("Collision detected!");
        setIsStarVisible(false);
        setStarCount((prev) => prev + 1);
      }
    }
  }, []);

  const checkCollisionBird = useCallback(() => {
    if (planeRef.current && birdRef.current) {
      const planeRect = planeRef.current.getBoundingClientRect();
      const birdRect = birdRef.current.getBoundingClientRect();

      const isColliding =
        planeRect.x < birdRect.x + birdRect.width &&
        planeRect.x + planeRect.width > birdRect.x &&
        planeRect.y < birdRect.y + birdRect.height &&
        planeRect.y + planeRect.height > birdRect.y;

      if (isColliding) {
        setGameOver(true);
        setFinalScore({ time: timer, stars: starCount });
        setIsBirdVisible(false);
      }
    }
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(checkCollisionChute, 100);
    return () => clearInterval(interval);
  }, [checkCollisionChute, isPaused]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(checkCollisionStar, 100);
    return () => clearInterval(interval);
  }, [checkCollisionStar, isPaused]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(checkCollisionBird, 100);
    return () => clearInterval(interval);
  }, [checkCollisionBird, isPaused]);

  useEffect(() => {
    const fuelInterval = setInterval(() => {
      if (isPaused) return;
      setFuel((prevFuel) => {
        if (prevFuel > 0) {
          return prevFuel - 1;
        }
        clearInterval(fuelInterval);
        audioRef.current.pause();
        gameOverAudioRef.current.play();
        setGameOver(true);
        setFinalScore({ time: timer, star: starCount });
        return 0;
      });
    }, 1000);

    return () => clearInterval(fuelInterval);
  }, [isPaused]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        setIsPaused((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    let interval = null;
    if (!isPaused) {
      interval = setInterval(() => {
        setTimer((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else if (isPaused && timer !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPaused, timer]);

  useEffect(() => {
    if (isPaused) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [isPaused]);

  return (
    <div
      className={`game__container ${isPaused ? "paused" : ""}`}
      ref={containerRef}
    >
      <PlayPauseButton isPaused={isPaused} setIsPaused={setIsPaused} />
      <GameCounter fuel={fuel} star={starCount} time={timer} />
      <Cloud parentRef={containerRef} timer={timer} />
      <Plane ref={planeRef} />
      <Parachute
        isPaused={isPaused}
        ref={chuteRef}
        isVisible={isVisible}
        parentRef={containerRef}
        setIsVisible={setIsVisible}
      />
      <Star
        isPaused={isPaused}
        ref={starRef}
        isVisible={isStarVisible}
        parentRef={containerRef}
        setIsVisible={setIsStarVisible}
      />
      <Bird
        isPaused={isPaused}
        ref={birdRef}
        parentRef={containerRef}
        isVisible={isBirdVisible}
        setIsVisible={setIsBirdVisible}
      />
      <audio ref={audioRef} loop>
        <source src={audio} type="audio/mpeg" />
      </audio>
      <audio ref={gameOverAudioRef}>
        <source src={gameOverAudio} type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default GameScreen;
