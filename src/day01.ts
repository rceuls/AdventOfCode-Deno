const calculate: (input: number[]) => number = (data) =>
  data.filter((_, i, arr) => i > 0 && arr[i - 1] < arr[i]).length;

const addRelevantItems = (input: number[]) => {
  const grouped: number[] = [];
  for (let i = 0; i < input.length - 2; i++) {
    grouped.push(input[i] + input[i + 1] + input[i + 2]);
  }
  return grouped;
};

const calculatePartTwo = (input: number[]) =>
  calculate(addRelevantItems(input));

export { calculate as calculatePartOne, calculatePartTwo };
