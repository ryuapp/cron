import type { CronSchedule, CronScheduleOption } from "./type.ts";
/**
 * Return the next time from cron schedule.
 * @param cs CronSchedule
 * @param option CronScheduleOption
 * @returns Date
 */
export function next(cs: CronSchedule, option?: CronScheduleOption): Date {
  const currentDate = option?.currentDate ?? Date.now();
  const next = new Date(currentDate);
  next.setMilliseconds(0);
  next.setSeconds(0);

  if (cs.minute !== undefined) {
    next.setMinutes(next.getMinutes() + 1);
  }

  if (cs.hour !== undefined) {
    next.setHours(next.getHours() + 1);
  }

  if (cs.dayOfMonth !== undefined) {
    next.setDate(next.getDate() + 1);
  }

  if (cs.month !== undefined) {
    next.setMonth(next.getMonth() + 1);
  }

  if (cs.dayOfWeek !== undefined) {
    next.setDate(next.getDate() + 1);
  }

  return next;
}
