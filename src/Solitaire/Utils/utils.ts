export const format: (time: number) => string = (time) => {
  return `${time < 10 ? "0" : ""}${time}`;
};

export const buildTime: (
  hours: number,
  minutes: number,
  seconds: number
) => string = (hours, minutes, seconds) => {
  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
};
