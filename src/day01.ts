const calculate: (input: number[]) => number = (data) =>
  data.filter((_, i, arr) => arr[i - 1] < arr[i]).length;

const addRelevantItems = (input: number[]) => {
  let currCount = 0;
  let currItem = 0;
  const grouped: number[] = [];

  for (let i = 0; i < input.length; i++) {
    currItem += input[i];
    if (currCount === 3) {
      grouped.push(currItem);
      currCount = 0;
      currItem = 0;
    }
  }
  if (currCount !== 0) {
    grouped.push(currItem);
  }
  return grouped;
};

const calculatePartTwoo: (input: number[]) => number = (input) =>
  calculate(addRelevantItems(input));

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
