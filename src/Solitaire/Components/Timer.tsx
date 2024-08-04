import { buildTime } from "../Utils/utils";

type Props = {
  seconds: number;
  minutes: number;
  hours: number;
};

function Timer({ seconds, minutes, hours }: Props) {
  return (
    <div className="text-5xl">
      <span>{buildTime(hours, minutes, seconds)}</span>
    </div>
  );
}

export default Timer;
