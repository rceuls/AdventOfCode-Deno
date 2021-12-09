const surfaceArea = (l: number, w: number, h: number) =>
  2 * l * w + 2 * w * h + 2 * h * l;

const wrappingNeeded = (l: number, w: number, h: number) =>
  surfaceArea(l, w, h) + Math.min(l * w, w * h, h * l);

const bowNeeded = (numbers: number[]) =>
  numbers.reduce((p, n) => p * n, 1) +
  (numbers[0] + numbers[0] + numbers[1] + numbers[1]);

const calculate = (input: string[]) =>
  input
    .map((x) => {
      const d = x.split("x").map((x) => +x);
      return wrappingNeeded(d[0], d[1], d[2]);
    })
    .reduce((n, p) => n + p);

const calculateRibbon = (input: string[]) =>
  input
    .map((x) => {
      const d = x
        .split("x")
        .map((x) => +x)
        .sort((x, y) => x - y);
      return bowNeeded(d);
    })
    .reduce((n, p) => n + p);

export {
  calculate as calculateDay02Part01,
  calculateRibbon as calculateDay02Part02,
};
