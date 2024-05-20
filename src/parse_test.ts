import { assertEquals } from "@std/assert";
import { parseExpression } from "./parse.ts";

const { test } = Deno;

test("parse simple expression", () => {
  assertEquals(parseExpression("* * * * *"), {
    minute: "*",
    hour: "*",
    day: "*",
    month: "*",
    weekday: "*",
  });
});
