export type CronSchedule = {
  minute?: CronScheduleExpression;
  hour?: CronScheduleExpression;
  dayOfMonth?: CronScheduleExpression;
  month?: CronScheduleExpression;
  dayOfWeek?: CronScheduleExpression;
};

export type CronScheduleExpression = number | {
  start?: number;
  end?: number;
  every?: number | number[];
  exact?: number | number[];
};

export type CronScheduleOption = {
  now: Date;
};
