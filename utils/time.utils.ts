export const formatTime = (secondsTotal: number) => {
  const days = Math.floor(secondsTotal / (24 * 60 * 60));
  secondsTotal %= 24 * 60 * 60;
  const hours = Math.floor(secondsTotal / (60 * 60));
  secondsTotal %= 60 * 60;
  const minutes = Math.floor(secondsTotal / 60);
  const seconds = Math.floor(secondsTotal % 60);

  return `${days}:${hours}:${minutes}:${seconds}`;
};
