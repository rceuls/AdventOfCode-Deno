const calculate = (data: number[]) =>
  data.filter((_, i, arr) => i > 0 && arr[i - 1] < arr[i]).length;

const addRelevantItems = (input: number[]) => {
  return input
    .map((_, index, arr) => arr[index] + arr[index + 1] + arr[index + 2])
    .filter((x) => !isNaN(x));
};

const calculatePartTwo = (input: number[]) =>
  calculate(addRelevantItems(input));

export {
  calculate as calculateDay01Part01,
  calculatePartTwo as calculateDay01Part02,
};
