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
  const currentDate = option?.currentDate
    ? new Date(option?.currentDate)
    : new Date();
  currentDate.setMilliseconds(0);
  currentDate.setSeconds(0);
  let nextDate = new Date(currentDate);

  if (cs.minute !== undefined) {
    nextDate = nextMinute(nextDate, cs.minute);
  }
  if (cs.hour !== undefined) {
    nextDate = nextHour(nextDate, cs.hour);
  }
  if (cs.dayOfMonth !== undefined && cs.dayOfWeek !== undefined) {
    const nextDateDayOfWeek = nextDayOfWeek(new Date(nextDate), cs.dayOfWeek);
    const nextDateDayOfMonth = nextDayOfMonth(
      new Date(nextDate),
      cs.dayOfMonth,
    );
    if (nextDateDayOfWeek.getTime() < nextDateDayOfMonth.getTime()) {
      nextDate = nextDateDayOfWeek;
    } else {
      nextDate = nextDateDayOfMonth;
    }
  } else if (cs.dayOfWeek !== undefined) {
    nextDate = nextDayOfWeek(nextDate, cs.dayOfWeek);
  } else if (cs.dayOfMonth !== undefined) {
    nextDate = nextDayOfMonth(nextDate, cs.dayOfMonth);
  }
  if (cs.month !== undefined) {
    nextDate = nextMonth(nextDate, cs.month);
  }

  if (nextDate.getTime() === currentDate.getTime()) {
    if (cs.dayOfWeek !== undefined && cs.dayOfMonth !== undefined) {
      const nextDateDayOfWeek = new Date(nextDate);
      nextDateDayOfWeek.setDate(nextDateDayOfWeek.getDate() + 7);
      const nextDateDayOfMonth = new Date(nextDate);
      nextDateDayOfMonth.setMonth(nextDateDayOfMonth.getMonth() + 1);
      if (nextDateDayOfWeek.getTime() < nextDateDayOfMonth.getTime()) {
        nextDate = nextDateDayOfWeek;
      } else {
        nextDate = nextDateDayOfMonth;
      }
    } else if (cs.dayOfWeek !== undefined) {
      nextDate.setDate(nextDate.getDate() + 7);
    } else if (cs.dayOfMonth !== undefined) {
      nextDate.setMonth(nextDate.getMonth() + 1);
    } else if (cs.month !== undefined) {
      nextDate.setFullYear(nextDate.getFullYear() + 1);
    } else if (cs.hour !== undefined) {
      nextDate.setDate(nextDate.getDate() + 1);
    } else if (cs.minute !== undefined) {
      nextDate.setHours(nextDate.getHours() + 1);
    }
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
