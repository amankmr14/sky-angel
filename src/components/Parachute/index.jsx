import React from "react";

import VerticalAnimationItem from "../VerticalAnimationItem";
import parachute from "../../assets/parachute.png";
import "./Parachute.css";

const Parachute = React.forwardRef((props, ref) => (
  <VerticalAnimationItem
    src={parachute}
    ref={ref}
    height={100}
    className="parachute"
    {...props}
  />
));

Parachute.displayName = "Parachute";

export default Parachute;
