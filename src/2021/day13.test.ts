import { assertEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { calculateDay13 } from "./day13.ts";
import { getText } from "../shared/file-util.ts";
import { TEST_DEFAULTS } from "../shared/test-util.ts";

const input = getText("day13.input.txt", 2021);
const inputTest = getText("day13.test.input.txt", 2021);

Deno.test({
  name: "2021 > day 13 > part 1 + 2 > example",
  fn() {
    const { uniqueCoords, output } = calculateDay13(inputTest);
    assertEquals(uniqueCoords, [17, 16]);
    assertEquals(output, "\n█████\n█   █\n█   █\n█   █\n█████\n");
  },
  ...TEST_DEFAULTS,
});

Deno.test({
  name: "2021 > day 13 > part 1 + 2 > actual",
  fn() {
    const { uniqueCoords, output } = calculateDay13(input);
    assertEquals(
      uniqueCoords,
      [763, 642, 550, 465, 378, 307, 247, 204, 170, 140, 121, 103]
    );
    const txt =
      "\n███  █  █  ██  █    ███   ██  ███   ██ " +
      "\n█  █ █  █ █  █ █    █  █ █  █ █  █ █  █" +
      "\n█  █ ████ █  █ █    █  █ █    █  █ █  █" +
      "\n███  █  █ ████ █    ███  █    ███  ████" +
      "\n█ █  █  █ █  █ █    █ █  █  █ █ █  █  █" +
      "\n█  █ █  █ █  █ ████ █  █  ██  █  █ █  █\n";
    assertEquals(output, txt);
  },
  ...TEST_DEFAULTS,
});
