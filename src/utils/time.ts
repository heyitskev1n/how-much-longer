export function calculateTimeUntil(target: Date) {
  let remaining = target.getTime() - new Date().getTime();

  if (remaining <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const days = Math.floor(remaining / DAY);
  remaining = remaining - days * DAY;

  const hours = Math.floor(remaining / HOUR);
  remaining = remaining - hours * HOUR;

  const minutes = Math.floor(remaining / MINUTE);
  remaining = remaining - minutes * MINUTE;

  const seconds = Math.floor(remaining / SECOND);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;
