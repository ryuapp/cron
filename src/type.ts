export type CronSchedule = {
  minute?: number | string;
  hour?: number | string;
  day?: number | string;
  month?: number | string;
  weekday?: number | string;
};
export type CronScheduleOption = {
  now: Date;
};
