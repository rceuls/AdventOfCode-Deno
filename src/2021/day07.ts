const calculate = (input: string) => {
  const initialState = input.split(",").map((x) => +x);
  initialState.sort((x, y) => x - y);

  const first = initialState.slice(0, initialState.length / 2);
  const last = initialState.slice(initialState.length / 2);
  return last.map((x, i) => x - first[i]).reduce((p, n) => p + n);
};

const moveCost = (num: number) => {
  let result = 0;
  for (let i = 1; i <= num; i++) {
    result += i;
  }
  return result;
};

const calculatePartTwo = (input: string) => {
  const initialState = input.split(",").map((x) => +x);
  initialState.sort((x, y) => x - y);
  const min = initialState[0];
  const max = initialState[initialState.length - 1];

  const totals = [];

  for (let i = min; i < max; i++) {
    totals.push(
      initialState.reduce((p, n) => moveCost(Math.abs(n - i)) + p, 0)
    );
  }

  return totals.sort((x, y) => x - y)[0];
};

export {
  calculate as calculateDay07Part01,
  calculatePartTwo as calculateDay07Part02,
};
