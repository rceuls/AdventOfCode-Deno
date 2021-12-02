import * as path from "https://deno.land/std/path/mod.ts";

const getFullPath = (filePath: string) =>
  path.join(Deno.cwd(), "resources", filePath);

export const getLines = (filePath: string) =>
  Deno.readTextFileSync(getFullPath(filePath))
    .split("\n")
    .map((x) => x.trim());

export const getLinesAsNumbers = (filePath: string) =>
  getLines(filePath).map((x) => +x);
