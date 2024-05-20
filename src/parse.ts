export type CronSchedule = {
  minute?: number | string;
  hour?: number | string;
  day?: number | string;
  month?: number | string;
  weekday?: number | string;
};

export function parseExpression(expression: string): CronSchedule {
  const parts = expression.split(" ");
  const [minute, hour, day, month, weekday] = parts.map(parsePart);
  const schedule: CronSchedule = {};

  if (minute !== undefined) schedule.minute = minute;
  if (hour !== undefined) schedule.hour = hour;
  if (day !== undefined) schedule.day = day;
  if (month !== undefined) schedule.month = month;
  if (weekday !== undefined) schedule.weekday = weekday;

  return schedule;
}
function parsePart(part: string): number | string | undefined {
  if (part === "*") {
    return undefined;
  } else if (/^\d+$/.test(part)) {
    return parseInt(part);
  }
  return part;
}
