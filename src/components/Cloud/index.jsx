import { useEffect, useState } from "react";

import cloud from "../../assets/cloud.png";
import "./Cloud.css";

const Cloud = ({ top, duration, delay }) => {
  return (
    <img
      className="cloud"
      src={cloud}
      height={150}
      alt="cloud"
      style={{
        top: `${top}px`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`
      }}
    />
  );
};

const CloudGenerator = ({ parentRef }) => {
  const [clouds, setClouds] = useState([]);

  useEffect(() => {
    if (parentRef.current) {
      const parentHeight = parentRef.current.clientHeight;
      const cloudHeight = 100;
      const verticalSpacing = Math.floor(parentHeight / 6);

      const generatedClouds = Array.from(
        { length: 6 },
        (_, i) => ({
          top:
            i * verticalSpacing +
            Math.random() * (verticalSpacing - cloudHeight),
          duration: 2 + Math.random() * 2,
          delay: 1 + Math.random() * 2
        })
      );

      setClouds(generatedClouds);
    }
  }, []);

  return (
    <>
      {clouds.map((cloud, index) => (
        <Cloud
          key={index}
          top={cloud.top}
          duration={cloud.duration}
          delay={cloud.delay}
        />
      ))}
    </>
  );
};

export default CloudGenerator;
