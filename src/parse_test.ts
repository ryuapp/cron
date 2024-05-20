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
    day: 3,
    month: 4,
    weekday: 5,
  });
});

test("parse mixed expression", () => {
  assertEquals(parseExpression("23 0-20/2 * * sun"), {
    minute: 23,
    hour: "0-20/2",
    weekday: "sun",
  });
});
