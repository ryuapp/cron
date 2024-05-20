export type CronDate = {
  minute: number | string;
  hour: number | string;
  day: number | string;
  month: number | string;
  weekday: number | string;
};

export function parseExpression(expression: string): CronDate {
  const parts = expression.split(" ");
  const [minute, hour, day, month, weekday] = parts;

  return {
    minute: parsePart(minute),
    hour: parsePart(hour),
    day: parsePart(day),
    month: parsePart(month),
    weekday: parsePart(weekday),
  };
}
function parsePart(part: string): number | string {
  if (/^\d+$/.test(part)) {
    return parseInt(part);
  }
  return part;
}
