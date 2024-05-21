import type {
  CronSchedule,
  CronScheduleExpression,
  CronScheduleOption,
} from "./type.ts";

/**
 * Return the next time from cron schedule.
 *
 * @param cs CronSchedule parseCronExpression return value
 * @param option CronScheduleOption
 * @returns Date
 */
export function nextDate(cs: CronSchedule, option?: CronScheduleOption): Date {
  const currentDate = option?.currentDate ?? Date.now();
  let nextDate = new Date(currentDate);
  nextDate.setMilliseconds(0);
  nextDate.setSeconds(0);

  if (cs.minute !== undefined) {
    nextDate = nextMinute(nextDate, cs.minute);
  }
  if (cs.hour !== undefined) {
    nextDate = nextHour(nextDate, cs.hour);
  }
  if (cs.dayOfMonth !== undefined) {
    nextDate = nextDayOfMonth(nextDate, cs.dayOfMonth);
  }
  if (cs.month !== undefined) {
    nextDate = nextMonth(nextDate, cs.month);
  }
  if (cs.dayOfWeek !== undefined) {
    nextDate = nextDayOfWeek(nextDate, cs.dayOfWeek);
  }

  return nextDate;
}

function nextMinute(date: Date, minute: CronScheduleExpression): Date {
  if (typeof minute === "number") {
    if (date.getMinutes() > minute) {
      date.setHours(date.getHours() + 1);
    }
    date.setMinutes(minute);
    return date;
  }
  return date;
}

function nextHour(date: Date, hour: CronScheduleExpression): Date {
  if (typeof hour === "number") {
    if (date.getHours() > hour) {
      date.setDate(date.getDate() + 1);
    }
    date.setHours(hour);
    return date;
  }
  return date;
}

function nextDayOfMonth(date: Date, dayOfMonth: CronScheduleExpression): Date {
  if (typeof dayOfMonth === "number") {
    if (date.getDate() > dayOfMonth) {
      date.setMonth(date.getMonth() + 1);
    }
    date.setDate(dayOfMonth);
    return date;
  }
  return date;
}

function nextMonth(date: Date, month: CronScheduleExpression): Date {
  if (typeof month === "number") {
    const jsMonth = month - 1;
    if (date.getMonth() > jsMonth) {
      date.setFullYear(date.getFullYear() + 1);
    }
    date.setMonth(jsMonth);
    return date;
  }
  return date;
}

function nextDayOfWeek(date: Date, dayOfWeek: CronScheduleExpression): Date {
  if (typeof dayOfWeek === "number") {
    if (date.getDay() > dayOfWeek) {
      date.setDate(date.getDate() + 1);
    }
    while (date.getDay() !== dayOfWeek) {
      date.setDate(date.getDate() + 1);
    }
    return date;
  }
  return date;
}
