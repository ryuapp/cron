import { assertEquals } from "@std/assert";
import { parseExpression } from "./parse.ts";

const { test } = Deno;

test("parse simple expression", () => {
  assertEquals(parseExpression("0 12 * * *"), {
    minute: 0,
    hour: 12,
  });
});

test("parse number expression", () => {
  assertEquals(parseExpression("0 2 3 4 5"), {
    minute: 0,
    hour: 2,
    dayOfMonth: 3,
    month: 4,
    dayOfWeek: 5,
  });
});

test("parse range expression", () => {
  assertEquals(parseExpression("0 2-4 3 4 5"), {
    minute: 0,
    hour: { start: 2, end: 4 },
    dayOfMonth: 3,
    month: 4,
    dayOfWeek: 5,
  });
});

test("parse every expression", () => {
  assertEquals(parseExpression("0 */2 3 4 5"), {
    minute: 0,
    hour: { every: 2 },
    dayOfMonth: 3,
    month: 4,
    dayOfWeek: 5,
  });
});

test("parse exact expression", () => {
  assertEquals(parseExpression("0 2,4 3 4 5,3,2"), {
    minute: 0,
    hour: { exact: [2, 4] },
    dayOfMonth: 3,
    month: 4,
    dayOfWeek: { exact: [5, 3, 2] },
  });
});

test("parse double every expression", () => {
  assertEquals(parseExpression("0 */2,*/4 3 4 5"), {
    minute: 0,
    hour: { every: [2, 4] },
    dayOfMonth: 3,
    month: 4,
    dayOfWeek: 5,
  });
});

test("parse mixed expression", () => {
  assertEquals(parseExpression("0 */2,5 3 4 */2"), {
    minute: 0,
    hour: { every: 2, exact: 5 },
    dayOfMonth: 3,
    month: 4,
    dayOfWeek: { every: 2 },
  });
});
