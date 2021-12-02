type Direction = "up" | "forward" | "down";

type MoveRecord = {
  direction: Direction;
  amount: number;
};

const parsePositions: (input: string[]) => MoveRecord[] = (input) =>
  input.map((x) => {
    const splitted = x.split(" ");
    return { direction: splitted[0] as Direction, amount: +splitted[1] };
  });

const calculate: (input: string[]) => { regular: number; adjusted: number } = (
  input
) => {
  const position = {
    adjusted: {
      horizontal: 0,
      vertical: 0,
      aim: 0,
    },
    regular: {
      horizontal: 0,
      vertical: 0,
    },
  };

  for (const mv of parsePositions(input)) {
    switch (mv.direction) {
      case "down":
        position.regular.vertical += mv.amount;
        position.adjusted.aim += mv.amount;
        break;
      case "up":
        position.regular.vertical -= mv.amount;
        position.adjusted.aim -= mv.amount;
        break;
      case "forward":
        position.regular.horizontal += mv.amount;
        position.adjusted.horizontal += mv.amount;
        position.adjusted.vertical += mv.amount * position.adjusted.aim;
        break;
    }
  }

  const calc = (inbound: { horizontal: number; vertical: number }): number =>
    inbound.horizontal * inbound.vertical;

  return {
    regular: calc(position.regular),
    adjusted: calc(position.adjusted),
  };
};
export { calculate };
