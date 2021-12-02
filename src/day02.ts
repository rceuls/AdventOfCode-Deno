type Position = {
  horizontal: number;
  vertical: number;
};

type State = {
  adjusted: {
    horizontal: number;
    vertical: number;
    aim: number;
  };
  regular: {
    horizontal: number;
    vertical: number;
  };
};

const doMove = (state: State, move: string) => {
  switch (move[0]) {
    case "d": {
      const amount = +move.slice(5);
      state.regular.vertical += amount;
      state.adjusted.aim += amount;
      break;
    }
    case "u":
      {
        const amount = +move.slice(3);
        state.regular.vertical -= amount;
        state.adjusted.aim -= amount;
      }
      break;
    case "f": {
      const amount = +move.slice(7);
      state.regular.horizontal += amount;
      state.adjusted.horizontal += amount;
      state.adjusted.vertical += amount * state.adjusted.aim;
      break;
    }
  }
  return state;
};

const calc = (inbound: Position): number =>
  inbound.horizontal * inbound.vertical;

const calculate = (input: string[]) => {
  const finalPosition = input.reduce(doMove, {
    adjusted: {
      horizontal: 0,
      vertical: 0,
      aim: 0,
    },
    regular: {
      horizontal: 0,
      vertical: 0,
    },
  });

  return {
    regular: calc(finalPosition.regular),
    adjusted: calc(finalPosition.adjusted),
  };
};

export { calculate };
