type Props = {
  seconds: number;
  minutes: number;
  hours: number;
};

function Timer({ seconds, minutes, hours }: Props) {
  const format: (time: number) => string = (time) => {
    return `${time < 10 ? "0" : ""}${time}`;
  };
  return (
    <div className="text-5xl">
      <span>{format(hours)}</span>:<span>{format(minutes)}</span>:
      <span>{format(seconds)}</span>
    </div>
  );
}

export default Timer;
