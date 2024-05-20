import type { CronSchedule, CronScheduleExpression } from "./type.ts";

export function parseExpression(expression: string): CronSchedule {
  const parts = expression.split(" ");
  const [minute, hour, dayOfMonth, month, dayOfWeek] = parts.map(
    parseExpressionPart,
  );
  const schedule: CronSchedule = {};

  if (minute !== null) {
    schedule.minute = minute;
  }
  if (hour !== null) {
    schedule.hour = hour;
  }
  if (dayOfMonth !== null) {
    schedule.dayOfMonth = dayOfMonth;
  }
  if (month !== null) {
    schedule.month = month;
  }
  if (dayOfWeek !== null) {
    schedule.dayOfWeek = dayOfWeek;
  }

  return schedule;
}

function parseExpressionPart(part: string): CronScheduleExpression | null {
  // any value
  if (part === "*") {
    return null;
  }

  // value list separator
  if (part.includes(",")) {
    const array = part.split(",").map((p) => parseExpressionPart(p));
    const obj: { exact: number[]; every: number[] } = {
      exact: [],
      every: [],
    };
    array.forEach((p) => {
      if (typeof p === "number") {
        obj.exact.push(p);
      }
      if (typeof p === "object" && p !== null && p.every) {
        if (Array.isArray(p.every)) {
          p.every.forEach((num) => obj.every.push(num));
        } else {
          obj.every.push(p.every);
        }
      }
    });
    const resultObj: CronScheduleExpression = {};
    if (Array.isArray(obj.every) && Array.isArray(obj.exact)) {
      if (obj.every.length === 0 && obj.exact.length === 0) return null;
      if (obj.every.length === 0) return { exact: obj.exact };
      if (obj.exact.length === 0) return { every: obj.every };
      if (obj.every.length === 1) resultObj.every = obj.every[0];
      if (obj.exact.length === 1) resultObj.exact = obj.exact[0];
    }
    return resultObj;
  }

  // range of values
  if (part.includes("-")) {
    const [start, end] = part.split("-").map((p) => parseExpressionPart(p));
    const obj: { start?: number; end?: number } = {};
    if (typeof start === "number") {
      obj.start = start;
    }
    if (typeof end === "number") {
      obj.end = end;
    }
    return obj;
  }

  // step values
  if (part.includes("/")) {
    const every = parseExpressionPart(part.split("/")[1]);
    if (typeof every !== "number") {
      throw new Error(`Invalid expression: ${part}`);
    }
    return { every };
  }

  return Number(part);
}
