import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay02 } from "./day02.ts";
import { getLines } from "../shared/file-util.ts";

const TEST_INPUT = [
  "forward 5",
  "down 5",
  "forward 8",
  "up 3",
  "down 8",
  "forward 2",
];

Deno.test({
  name: "2021 > day 2 > part 1 + 2 > example",
  fn() {
    const result = calculateDay02(TEST_INPUT);

    assertEquals(result.regular, 150);
    assertEquals(result.adjusted, 900);
  },
  ...TEST_INPUT,
});

Deno.test({
  name: "2021 > day 2 > part 1 + 2 > actual",
  fn() {
    const input = getLines("day02.input.txt", 2021);
    const result = calculateDay02(input);

    assertEquals(result.regular, 1_480_518);
    assertEquals(result.adjusted, 1_282_809_906);
  },
  ...TEST_INPUT,
});
