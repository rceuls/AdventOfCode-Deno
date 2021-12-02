const calculate: (input: number[]) => number = (data) =>
  data.filter((_, i, arr) => i > 0 && arr[i - 1] < arr[i]).length;

const addRelevantItems = (input: number[]) => {
  return input
    .map((_, index, arr) => arr[index] + arr[index + 1] + arr[index + 2])
    .filter((_, i, arr) => i < arr.length - 2);
};

const calculatePartTwo = (input: number[]) =>
  calculate(addRelevantItems(input));

export { calculate as calculatePartOne, calculatePartTwo };
