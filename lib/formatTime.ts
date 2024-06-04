export const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const remainingMinutes = Math.floor(seconds % 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return hours
    ? `${hours}:${remainingMinutes < 10 ? "0" : ""}${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
    : `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
