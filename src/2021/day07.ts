const parseInput = (input: string) =>
  input
    .split(",")
    .map((x) => +x)
    .sort((x, y) => x - y);

const moveCost = (m: number) => (m * (m + 1)) / 2;

const calculate = (input: string) => {
  const initialState = parseInput(input);
  const first = initialState.slice(0, initialState.length / 2);
  const last = initialState.slice(initialState.length / 2);

  return last.reduce((p, n) => p + n) - first.reduce((p, n) => p + n);
};

const calculatePartTwo = (input: string) => {
  const initialState = parseInput(input);

  const min = initialState[0];
  const max = initialState[initialState.length - 1];

  let minFuel = Infinity;
  for (let i = min; i < max; i++) {
    const fuel = initialState.reduce(
      (p, n) => moveCost(Math.abs(n - i)) + p,
      0
    );

    if (fuel < minFuel) {
      minFuel = fuel;
    }
  }

  return minFuel;
};

export {
  calculate as calculateDay07Part01,
  calculatePartTwo as calculateDay07Part02,
};
