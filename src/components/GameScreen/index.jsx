import React, { useCallback, useEffect, useRef, useState } from "react";

import Cloud from "../Cloud";
import Plane from "../Plane";
import Parachute from "../Parachute";
import GameCounter from "../GameScore";
import Star from "../Stars";
import Bird from "../Bird";

import audio from "../../assets/bgm.mp3";

function GameScreen({ setGameOver, setFinalScore, isPaused, parentRef }) {
  const planeRef = useRef(null);
  const chuteRef = useRef(null);
  const starRef = useRef(null);
  const audioRef = useRef(null);
  const birdRefs = useRef(Array.from({ length: 3 }, () => React.createRef()));

  const [isVisible, setIsVisible] = useState(false);
  const [isStarVisible, setIsStarVisible] = useState(false);
  const [fuel, setFuel] = useState(10);
  const [starCount, setStarCount] = useState(0);
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
        setIsStarVisible(false);
        setStarCount((prev) => prev + 1);
      }
    }
  }, []);

  const checkCollisionBird = useCallback(() => {
    if (planeRef.current) {
      const planeRect = planeRef.current.getBoundingClientRect();

      birdRefs.current.forEach((birdRef) => {
        if (birdRef.current) {
          const birdRect = birdRef.current.getBoundingClientRect();

          const isColliding =
            planeRect.x < birdRect.x + birdRect.width &&
            planeRect.x + planeRect.width > birdRect.x &&
            planeRect.y < birdRect.y + birdRect.height &&
            planeRect.y + planeRect.height > birdRect.y;

          if (isColliding) {
            setFinalScore({ time: timer, stars: starCount });
            setGameOver(true);
          }
        }
      });
    }
  }, [timer, starCount, setFinalScore, setGameOver, birdRefs]);

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
        setFinalScore({ time: timer, star: starCount });
        setGameOver(true);
        return 0;
      });
    }, 1000);

    return () => clearInterval(fuelInterval);
  }, [isPaused]);

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
    <>
      <GameCounter fuel={fuel} star={starCount} time={timer} />
      <Cloud parentRef={parentRef} timer={timer} />
      <Plane ref={planeRef} />
      <Parachute
        isPaused={isPaused}
        ref={chuteRef}
        isVisible={isVisible}
        parentRef={parentRef}
        setIsVisible={setIsVisible}
      />
      <Star
        isPaused={isPaused}
        ref={starRef}
        isVisible={isStarVisible}
        parentRef={parentRef}
        setIsVisible={setIsStarVisible}
      />
      <Bird birdRefs={birdRefs} parentRef={parentRef} />
      <audio ref={audioRef} loop>
        <source src={audio} type="audio/mpeg" />
      </audio>
    </>
  );
}

export default GameScreen;
