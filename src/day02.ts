type Position = {
  horizontal: number;
  vertical: number;
};

type State = {
  adjusted: {
    position: Position;
    aim: number;
  };
  regular: {
    position: Position;
  };
};

const doMove = (state: State, move: string) => {
  const newState = { ...state };
  switch (move[0]) {
    case "d": {
      const amount = +move.slice(5);
      newState.regular.position.vertical += amount;
      newState.adjusted.aim += amount;
      break;
    }
    case "u":
      {
        const amount = +move.slice(3);
        newState.regular.position.vertical -= amount;
        newState.adjusted.aim -= amount;
      }
      break;
    case "f": {
      const amount = +move.slice(7);
      newState.regular.position.horizontal += amount;
      newState.adjusted.position.horizontal += amount;
      newState.adjusted.position.vertical += amount * newState.adjusted.aim;
      break;
    }
  }
  return newState;
};

const calc = (inbound: Position): number =>
  inbound.horizontal * inbound.vertical;

const calculate = (input: string[]) => {
  const finalPosition = input.reduce(doMove, {
    adjusted: {
      position: { horizontal: 0, vertical: 0 },
      aim: 0,
    },
    regular: {
      position: { horizontal: 0, vertical: 0 },
    },
  });

  return {
    regular: calc(finalPosition.regular.position),
    adjusted: calc(finalPosition.adjusted.position),
  };
};

export { calculate };
