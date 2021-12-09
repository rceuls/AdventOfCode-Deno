const isLowest = (
  matrix: number[][],
  y: number,
  x: number,
  maxY: number,
  maxX: number
) => {
  const item = matrix[y][x];
  const yToCheck = [y, y > 0 ? y - 1 : -1, y < maxY - 1 ? y + 1 : -1].filter(
    (x) => x >= 0
  );

  const xToCheck = [x, x > 0 ? x - 1 : -1, x < maxX - 1 ? x + 1 : -1].filter(
    (x) => x >= 0
  );

  const toCheck: number[] = [];

  if (yToCheck.includes(y - 1)) {
    toCheck.push(matrix[y - 1][x]);
  }
  if (yToCheck.includes(y + 1)) {
    toCheck.push(matrix[y + 1][x]);
  }
  if (xToCheck.includes(x - 1)) {
    toCheck.push(matrix[y][x - 1]);
  }
  if (xToCheck.includes(x + 1)) {
    toCheck.push(matrix[y][x + 1]);
  }
  if (toCheck.includes(item)) {
    return false;
  }
  toCheck.push(item);
  const lowPoint = Math.min(...toCheck);
  return item === lowPoint;
};

const calculate = (input: string[]) => {
  const matrix = input.map((x) => x.split("").map((x) => +x));
  const maxY = matrix.length;
  const maxX = matrix[0].length;

  const lowest: number[] = [];
  const lowestCoordinates: number[][] = [];
  for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
      const item = matrix[y][x];
      if (isLowest(matrix, y, x, maxY, maxX)) {
        lowest.push(item);
        lowestCoordinates.push([y, x]);
      }
    }
  }
  return {
    risk: lowest.reduce((pH, h) => pH + h + 1, 0),
    basinStarts: lowestCoordinates,
    matrix,
    maxX,
    maxY,
  };
};

const getSurroundCoordinates = (data: {
  maxX: number;
  maxY: number;
  x: number;
  y: number;
}) => {
  const { x, y, maxX, maxY } = { ...data };
  const items = [];
  items.push([y, x]);
  items.push([y + 1, x]);
  items.push([y - 1, x]);
  items.push([y, x + 1]);
  items.push([y, x - 1]);
  return items.filter(
    (d) => d[0] >= 0 && d[0] < maxY && d[1] >= 0 && d[1] < maxX
  );
};

const calculateArea = (data: {
  x: number;
  y: number;
  maxX: number;
  maxY: number;
  matrix: number[][];
  checkedCoords: Set<string>;
}) => {
  const { x, y, matrix, checkedCoords } = { ...data };
  const num = matrix[y][x];
  const kvp = `${y}:${x}`;
  const cnt: string[] = [];

  if (num === 9 || checkedCoords.has(kvp)) {
    return [];
  }
  checkedCoords.add(kvp);

  cnt.push(kvp);

  const coordsToCheck = getSurroundCoordinates({ ...data });

  for (const c of coordsToCheck) {
    cnt.push(...calculateArea({ ...data, x: c[1], y: c[0] }));
  }

  return cnt;
};

const calculatePart02 = (input: string[]) => {
  const res = calculate(input);
  const sizes: number[] = [];

  for (const co of res.basinStarts) {
    const checkedCoords: Set<string> = new Set();
    const d = calculateArea({
      ...res,
      x: co[1],
      y: co[0],
      checkedCoords,
    });
    sizes.push(d.length);
  }

  return sizes
    .sort((x, y) => y - x)
    .slice(0, 3)
    .reduce((p, n) => p * n, 1);
};
export {
  calculate as calculateDay09Part01,
  calculatePart02 as calculateDay09Part02,
};
