import React, { useEffect, useState } from "react";

import bird from "../../assets/bird.png";

const Bird = React.forwardRef(
  ({ top, duration, delay, onAnimationEnd }, ref) => {
    return (
      <img
        ref={ref}
        className="bird"
        src={bird}
        height={60}
        width={60}
        alt="bird"
        onAnimationEnd={onAnimationEnd}
        style={{
          top: `${top}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  }
);

Bird.displayName = "Bird";

const BirdGenerator = ({ parentRef, birdRefs }) => {
  const [birds, setBirds] = useState([]);

  const spawnBirds = () => {
    if (parentRef.current) {
      console.log("asdad");
      const parentHeight = parentRef.current.clientHeight;
      const birdHeight = 60;
      const verticalSpacing = Math.floor(parentHeight / 3);

      const generatedBirds = Array.from({ length: 3 }, (_, i) => ({
        top:
          i * verticalSpacing + Math.random() * (verticalSpacing - birdHeight),
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 2,
        id: Math.random()
      }));

      setBirds(generatedBirds);
    }
  };

  const lastBird = birds.reduce((last, bird) => {
    const lastTime = last ? last.duration + last.delay : 0;
    const currentTime = bird.duration + bird.delay;
    return currentTime > lastTime ? bird : last;
  }, null);

  useEffect(() => {
    spawnBirds();
  }, []);

  return (
    <>
      {birds.map((bird, index) => (
        <Bird
          key={bird.id}
          ref={birdRefs?.current[index]}
          top={bird.top}
          duration={bird.duration}
          delay={bird.delay}
          onAnimationEnd={bird.id === lastBird.id ? spawnBirds : null}
        />
      ))}
    </>
  );
};

export default BirdGenerator;
