import React, { useEffect, useState } from "react";

import star from "../../assets/star.png"
import "./Star.css";

const Star = React.forwardRef(
  ({ isVisible, parentRef, setIsVisible, isPaused }, ref) => {
    const [position, setPosition] = useState({ left: 0 });

    const [uniqueKey, setUniqueKey] = useState(1);

    const [animationCompleted, setAnimationCompleted] = useState(false);

    const deployStar = () => {
      if (isVisible && !animationCompleted) return;
      setIsVisible(true);

      const randomLeft = Math.random() * (parentRef.current.clientWidth - 100);
      setPosition({ left: randomLeft });

      setUniqueKey((prevKey) => prevKey + 1);
      setAnimationCompleted(false);
    };

    useEffect(() => {
      if (isPaused) return;
      const interval = setInterval(() => {
        deployStar();
      }, Math.random() * 7000 + 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      isVisible && (
        <img
          key={`star-${uniqueKey}`}
          className="star"
          height={70}
          ref={ref}
          src={star}
          alt="star"
          style={{
            left: position.left,
          }}
        />
      )
    );
  }
);

Star.displayName = "Star";

export default Star;
