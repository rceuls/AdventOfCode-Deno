import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculate } from "./day02.ts";
import { getLines } from "./shared/fileUtil.ts";

const TEST_INPUT = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2",
];
const ACTUAL_INPUT_PATH = "./resources/day02.input.txt";

Deno.test("2021 > day 2 > part 1 + 2 > example", () => {
  const result = calculate(TEST_INPUT);

  assertEquals(result.regular, 150);
  assertEquals(result.adjusted, 900);
});

Deno.test("2021 > day 2 > part 1 + 2 > actual", async () => {
  const data = await getLines(ACTUAL_INPUT_PATH);
  const result = calculate(data);

  assertEquals(result.regular, 1480518);
  assertEquals(result.adjusted, 1282809906);
});
