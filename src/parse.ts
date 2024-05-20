export type CronDate = {
  minute: string;
  hour: string;
  day: string;
  month: string;
  weekday: string;
};

export function parseExpression(expression: string): CronDate {
  const parts = expression.split(" ");
  const [minute, hour, day, month, weekday] = parts;

  return {
    minute,
    hour,
    day,
    month,
    weekday,
  };
}
