const calculate: (input: number[]) => number = (data) =>
  data.filter((_, i, arr) => arr[i - 1] < arr[i]).length;

const sumRelevantItems: (input: number[], index: number) => number = (
  input,
  index
) =>
  input
    .filter((_, ix) => [index, index + 1, index + 2].includes(ix))
    .reduce((p, n) => p + n, 0);

const calculatePartTwo: (input: number[]) => number = (input) =>
  calculate(input.map((_, ix) => sumRelevantItems(input, ix)));

export { calculate as calculatePartOne, calculatePartTwo };
