import { assertEquals } from "@std/assert";
import { nextDate } from "./next_date.ts";
import type { CronSchedule } from "./type.ts";

const { test } = Deno;

test("next minute", () => {
  const cs: CronSchedule = { minute: 30 };
  assertEquals(
    nextDate(cs, { currentDate: new Date("2024-01-01 12:00") }),
    new Date("2024-01-01 12:30"),
  );
});

test("next hour", () => {
  const cs: CronSchedule = { minute: 0, hour: 2 };
  assertEquals(
    nextDate(cs, { currentDate: new Date("2024-01-01 12:00") }),
    new Date("2024-01-02 2:00"),
  );
});

test("next day", () => {
  const cs: CronSchedule = { minute: 0, hour: 2, dayOfMonth: 13 };
  assertEquals(
    nextDate(cs, { currentDate: new Date("2024-01-01 12:00") }),
    new Date("2024-01-13 2:00"),
  );
});

test("next month", () => {
  const cs: CronSchedule = { minute: 0, hour: 12, month: 9 };
  assertEquals(
    nextDate(cs, { currentDate: new Date("2024-01-01 12:00") }),
    new Date("2024-09-01 12:00"),
  );
});

test("next dayOfweek", () => {
  const cs: CronSchedule = { minute: 0, hour: 2, dayOfWeek: 5 };
  // current date is 2024-01-01, it is Monday
  assertEquals(
    nextDate(cs, { currentDate: new Date("2024-01-01 12:00") }),
    new Date("2024-01-05 2:00"),
  );
});

test("If the time is the same, return the next time", () => {
  const cs: CronSchedule = { minute: 0, hour: 2, dayOfWeek: 5 };
  assertEquals(
    nextDate(cs, { currentDate: new Date("2024-01-05 02:00") }),
    new Date("2024-01-12 2:00"),
  );
});
