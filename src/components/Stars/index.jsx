import React from "react";

import VerticalAnimationItem from "../VerticalAnimationItem";
import star from "../../assets/star.png";
import "./Star.css";

const Star = React.forwardRef((props, ref) => (
  <VerticalAnimationItem
    src={star}
    ref={ref}
    height={70}
    className="star"
    {...props}
  />
));

Star.displayName = "Star";

export default Star;
