import { writeFile } from "../shared/file-util.ts";

const INDEX_Y = 0;
const INDEX_X = 1;

const calculate = (
  input: string,
  onlyFirst: boolean,
  printOutput?: boolean
) => {
  const [coordsRaw, foldsRaw] = input.split("\n\n");
  const coords = coordsRaw.split("\n").map((x) => x.split(",").map((x) => +x));
  let folds = foldsRaw
    .split("\n")
    .map((x) => x.replace("fold along ", "").split("="));

  if (onlyFirst) {
    folds = [folds[0]];
  }

  for (const f of folds) {
    const [foldAxis, foldIndexS] = f;
    const foldIndex = +foldIndexS;

    if (foldAxis === "y") {
      for (let i = 0; i < coords.length; i++) {
        coords[i][INDEX_X] =
          foldIndex > coords[i][INDEX_X]
            ? coords[i][INDEX_X]
            : foldIndex - (coords[i][INDEX_X] - foldIndex);
      }
    }

    if (foldAxis === "x") {
      for (let i = 0; i < coords.length; i++) {
        coords[i][INDEX_Y] =
          foldIndex > coords[i][INDEX_Y]
            ? coords[i][INDEX_Y]
            : foldIndex - (coords[i][INDEX_Y] - foldIndex);
      }
    }
  }

  const ds = new Set(coords.map((xy) => `${xy[INDEX_Y]}:${xy[INDEX_X]}`));
  const uniques = Array.from(ds).map((x) => x.split(":").map((xy) => +xy));

  if (printOutput) {
    let asString = "\n";

    const maxX = Math.max(...uniques.map((x) => x[INDEX_X])) + 1;
    const maxY = Math.max(...uniques.map((y) => y[INDEX_Y])) + 1;

    for (let i = 0; i < maxX; i++) {
      for (let j = 0; j < maxY; j++) {
        asString += ds.has(`${j}:${i}`) ? "x" : ".";
      }
      asString += "\n";
    }
    console.log(asString);
  }

  return uniques.length;
};

export { calculate as calculateDay13 };
