export const formatTime = (secs) => {
  const minutes = Math.floor(secs / 60);
  const remainingSeconds = secs % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};
