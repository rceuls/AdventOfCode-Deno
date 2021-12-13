const INDEX_Y = 0;
const INDEX_X = 1;

const calculate = (input: string) => {
  const [coordsRaw, foldsRaw] = input.split("\n\n");
  const coords = coordsRaw.split("\n").map((x) => x.split(",").map((x) => +x));
  const folds = foldsRaw
    .split("\n")
    .map((x) => x.replace("fold along ", "").split("="));
  let asString = "\n";
  const uniqueCoords = [];

  for (const f of folds) {
    const [foldAxis, foldIndexS] = f;
    const foldIndex = +foldIndexS;
    const tgtIndex = foldAxis === "y" ? INDEX_X : INDEX_Y;
    for (let i = 0; i < coords.length; i++) {
      coords[i][tgtIndex] =
        foldIndex > coords[i][tgtIndex]
          ? coords[i][tgtIndex]
          : foldIndex - (coords[i][tgtIndex] - foldIndex);
    }
    const ds = new Set(coords.map((xy) => `${xy[INDEX_Y]}:${xy[INDEX_X]}`));
    uniqueCoords.push(ds.size);
  }

  const ds = new Set(coords.map((xy) => `${xy[INDEX_Y]}:${xy[INDEX_X]}`));
  const uniques = Array.from(ds).map((x) => x.split(":").map((xy) => +xy));

  const maxX = Math.max(...uniques.map((x) => x[INDEX_X])) + 1;
  const maxY = Math.max(...uniques.map((y) => y[INDEX_Y])) + 1;

  for (let i = 0; i < maxX; i++) {
    for (let j = 0; j < maxY; j++) {
      asString += ds.has(`${j}:${i}`) ? "█" : " ";
    }
    asString += "\n";
  }

  return {
    output: asString,
    uniqueCoords,
  };
};

export { calculate as calculateDay13 };
