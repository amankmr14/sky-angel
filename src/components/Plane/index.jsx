import React, { useState } from "react";
import plane from "../../assets/plane.png";
import { useEffect } from "react";

const Plane = React.forwardRef((_, ref) => {
  const [position, setPosition] = useState({ top: 50, left: 0 });

  useEffect(() => {
    const handleKeyPress = (e) => {
      setPosition((prev) => {
        switch (e.key) {
          case "ArrowUp":
            return { ...prev, top: Math.max(prev.top - 5, 0) };
          case "ArrowDown":
            return {
              ...prev,
              top: Math.min(prev.top + 5, 100),
            };
          case "ArrowLeft":
            return {
              ...prev,
              left: Math.max(prev.left - 5, 0),
            };
          case "ArrowRight":
            return {
              ...prev,
              left: Math.min(prev.left + 5, 90),
            };
          default:
            return prev;
        }
      });
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <img
      className="plane"
      ref={ref}
      src={plane}
      width={100}
      style={{
        top: `${position.top}%`,
        left: `${position.left}%`,
        transform: "translateY(-50%)",
      }}
    />
  );
});

Plane.displayName = "Plane";

export default Plane;
