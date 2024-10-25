import React, { useEffect, useState } from "react";
import parachute from "../../assets/parachute.png"
import "./Parachute.css";

const Parachute = React.forwardRef(
  ({ parentRef, isVisible, setIsVisible, isPaused }, ref) => {
    const [position, setPosition] = useState({ top: 0 });
    const [uniqueKey, setUniqueKey] = useState(1);

    const deployParachute = () => {
      setIsVisible(true);

      const randomLeft = Math.random() * (parentRef.current.clientWidth - 100);
      setPosition({ left: randomLeft });

      setUniqueKey((prevKey) => prevKey + 1);
    };

    useEffect(() => {
      if (isPaused) return;
      const interval = setInterval(() => {
        deployParachute();
      }, Math.random() * 7000 + 1000);

      return () => clearInterval(interval);
    }, [isPaused]);

    return (
      isVisible && (
        <img
          key={`para-${uniqueKey}`}
          className="parachute"
          src={parachute}
          ref={ref}
          style={{
            left: position.left,
          }}
        />
      )
    );
  }
);

Parachute.displayName = "Parachute";

export default Parachute;
