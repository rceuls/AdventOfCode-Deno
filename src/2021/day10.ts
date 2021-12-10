const starters = "([{<".split("");
const stoppers = ")]}>".split("");
const misMatchPoints = [3, 57, 1197, 25137];
const addingPoints = [1, 2, 3, 4];

const cleanLine = (line: string[]) => {
  for (let i = 0; i < line.length - 1; ) {
    const fi = starters.indexOf(line[i]);
    const si = stoppers.indexOf(line[i + 1]);
    if (fi > -1 && si > -1) {
      if (fi === si) {
        line.splice(i, 2);
        i = 0;
        continue;
      }
    }
    i++;
  }
  return line;
};

const calculate01 = (input: string[]) => {
  const pts = [];
  const cleanLines = [];
  const lines = input.map((x) => x.split(""));
  for (const origin of lines) {
    const line = cleanLine(origin);
    const firstCloser = line.findIndex((x) => stoppers.includes(x));
    if (firstCloser > -1) {
      pts.push(misMatchPoints[stoppers.indexOf(line[firstCloser])]);
    } else {
      cleanLines.push(line);
    }
  }
  return { points: pts.reduce((n, p) => n + p, 0), cleanLines };
};

const calculate = (input: string[]) => {
  const { cleanLines, points } = calculate01(input);
  const scores: number[] = [];
  for (let i = 0; i < cleanLines.length; i++) {
    const line = cleanLines[i].reverse();
    let val = 0;
    for (let j = 0; j < line.length; j++) {
      const ix = starters.indexOf(line[j]);
      const toAdd = addingPoints[ix];
      val *= 5;
      val += toAdd;
    }
    scores.push(val);
  }
  return {
    adding: scores.sort((x, y) => x - y)[Math.floor(scores.length / 2)],
    mismatch: points,
  };
};

export { calculate as calculateDay10 };
