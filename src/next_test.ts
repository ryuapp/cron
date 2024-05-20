import { assertEquals } from "@std/assert";
import { next } from "./next.ts";
import type { CronSchedule } from "./type.ts";

const { test } = Deno;

test("next minute", () => {
  const cs: CronSchedule = { minute: 0 };
  assertEquals(
    next(cs, { now: new Date(2024, 0, 1, 0, 0, 0, 0) }),
    new Date(2024, 0, 1, 0, 1, 0, 0),
  );
});

test("next hour", () => {
  const cs: CronSchedule = { hour: 0 };
  assertEquals(
    next(cs, { now: new Date(2024, 0, 1, 0, 0, 0, 0) }),
    new Date(2024, 0, 1, 1, 0, 0, 0),
  );
});

test("next day", () => {
  const cs: CronSchedule = { day: 1 };
  assertEquals(
    next(cs, { now: new Date(2024, 0, 1, 0, 0, 0, 0) }),
    new Date(2024, 0, 2, 0, 0, 0, 0),
  );
});

test("next month", () => {
  const cs: CronSchedule = { month: 1 };
  assertEquals(
    next(cs, { now: new Date(2024, 0, 1, 0, 0, 0, 0) }),
    new Date(2024, 1, 1, 0, 0, 0, 0),
  );
});

test("next weekday", () => {
  const cs: CronSchedule = { weekday: 1 };
  assertEquals(
    next(cs, { now: new Date(2024, 0, 1, 0, 0, 0, 0) }),
    new Date(2024, 0, 2, 0, 0, 0, 0),
  );
});

test("next mixed", () => {
  const cs: CronSchedule = { minute: 0, hour: 0, day: 1, month: 1, weekday: 1 };
  assertEquals(
    next(cs, { now: new Date(2024, 0, 1, 0, 0, 0, 0) }),
    new Date(2024, 1, 3, 1, 1, 0, 0),
  );
});
