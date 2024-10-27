import "./Loader.css";

const CircularLoader = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="40"
      height="40"
      className="circular-loader"
    >
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="4"
        stroke="#4fa3f7"
        strokeLinecap="round"
      ></circle>
    </svg>
  );
};

export default CircularLoader;
