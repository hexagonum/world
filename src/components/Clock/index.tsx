import { addZero } from '@world/utils/add-zero';
import { useEffect, useState } from 'react';

const oneHour = 1000 * 60 * 60;

const getClock = (timezome: number) => {
  const d: Date = new Date();
  const time: number = d.getTime();
  const machineTimezone: number = d.getTimezoneOffset() / -60;
  const cityTime: number = time - oneHour * (timezome - machineTimezone);
  const cityD: Date = new Date(cityTime);
  const hh: string = addZero(cityD.getHours());
  const mm: string = addZero(cityD.getMinutes());
  const ss: string = addZero(cityD.getSeconds());
  return `${hh}:${mm}:${ss}`;
};

export type ClockProps = { timezome?: number };

export const Clock: React.FC<ClockProps> = ({ timezome = 0 }) => {
  const [clock, setClock] = useState(getClock(timezome));

  useEffect(() => {
    const interval = setInterval(() => {
      setClock(getClock(timezome));
    }, 1000);
    return () => clearInterval(interval);
  }, [timezome]);

  return (
    <div className="w-full flex justify-between items-center">
      <p>
        Timezone: {timezome > 0 ? '+' : ''}
        {timezome}
      </p>
      <p className="font-bold">{clock}</p>
    </div>
  );
};

export default Clock;
