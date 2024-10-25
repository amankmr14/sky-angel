import React, { useEffect, useState } from "react";

import bird from "../../assets/bird.png"

const Bird = React.forwardRef(({ isVisible, setIsVisible, parentRef }, ref) => {
  const [position, setPosition] = useState({ top: 0 });
  const [uniqueKey, setUniqueKey] = useState(1);
  const [animationDuration, setAnimationDuration] = useState(1);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  const spawnBird = () => {
    if (isVisible && !animationCompleted) return;
    setIsVisible(true);
    const randomTop = Math.random() * (parentRef.current.clientHeight - 100);
    setPosition({ top: randomTop });

    const randomDuration = Math.random() * 2 + 1;
    setAnimationDuration(randomDuration);
    setUniqueKey((prevKey) => prevKey + 1);
    setAnimationCompleted(false);

    setTimeout(() => {
      setAnimationCompleted(true);
      setIsVisible(false);
    }, randomDuration * 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      spawnBird();
    }, Math.random() * 3000 + 2000);

    return () => clearInterval(interval);
  }, []);

  if (isVisible)
    return (
      <img
        key={`bird-${uniqueKey}`}
        ref={ref}
        className="bird"
        src={bird}
        alt="bird"
        height={60}
        width={60}
        style={{
          top: position.top,
          animationDuration: `${animationDuration}s`,
        }}
      />
    );

  return null;
});

Bird.displayName = "Bird";

export default Bird;
