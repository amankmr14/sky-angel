import React, { useEffect, useState } from "react";

const VerticalAnimationItem = React.forwardRef(
  (
    {
      isVisible,
      parentRef,
      setIsVisible,
      className,
      height,
      src,
    },
    ref
  ) => {
    const [position, setPosition] = useState({ left: 0 });

    const [uniqueKey, setUniqueKey] = useState(1);

    const deployAnimation = () => {
      setIsVisible(true);

      const randomLeft = Math.random() * (parentRef.current.clientWidth - 100);
      setPosition({ left: randomLeft });

      setUniqueKey((prevKey) => prevKey + 1);
    };

    useEffect(() => {
      deployAnimation();
    }, [isVisible]);

    return (
      isVisible && (
        <img
          key={`${className}-${uniqueKey}`}
          className={className}
          height={height}
          ref={ref}
          src={src}
          alt={className}
          onAnimationEnd={deployAnimation}
          style={{
            left: position.left,
          }}
        />
      )
    );
  }
);

VerticalAnimationItem.displayName = "Star";

export default VerticalAnimationItem;
