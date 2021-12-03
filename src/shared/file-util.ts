import * as path from "https://deno.land/std/path/mod.ts";

const getFullPath = (filePath: string, year: number) =>
  path.join(Deno.cwd(), "resources", year.toString(), filePath);

export const getLines = (filePath: string, year: number) =>
  Deno.readTextFileSync(getFullPath(filePath, year))
    .split("\n")
    .map((x) => x.trim());

export const getLinesAsNumbers = (filePath: string, year: number) =>
  getLines(filePath, year).map((x) => +x);
