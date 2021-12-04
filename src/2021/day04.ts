const BOARD_SIZE = 5;

type Board = {
  index: number;
  items: { val: number; hit: boolean }[][];
};

type Result = {
  called: number;
  unmarked: number;
};

const getBoardsAndInput: (input: string) => {
  input: number[];
  boards: Board[];
} = (input) => {
  const splitted = input.split("\n\n");
  const getBoard = (raw: string, index: number) => {
    const board: Board = { items: [], index };
    const lines = raw.split("\n");
    for (let i = 0; i < BOARD_SIZE; i++) {
      board.items[i] = [];
      for (let j = 0; j < BOARD_SIZE; j++) {
        board.items[i].push({
          hit: false,
          val: +lines[i].slice(0 + 3 * j, 3 + 3 * j),
        });
      }
    }
    return board;
  };

  return {
    input: splitted[0].split(",").map((x) => +x),
    boards: splitted.slice(1).map(getBoard),
  };
};

const winCalculator = (called: number, board: Board) => {
  let shouldCheck = false;
  let unmarked = 0;

  for (let j = 0; j < BOARD_SIZE; j++) {
    for (let i = 0; i < BOARD_SIZE; i++) {
      const item = board.items[j][i];
      if (item.val === called) {
        item.hit = true;
        shouldCheck = true;
      } else if (!item.hit) {
        unmarked += item.val;
      }
    }
  }

  if (shouldCheck) {
    for (let k = 0; k < BOARD_SIZE; k++) {
      let xHit = 0;
      let yHit = 0;
      for (let i = 0; i < BOARD_SIZE; i++) {
        xHit += board.items[i][k].hit ? 1 : 0;
        yHit += board.items[k][i].hit ? 1 : 0;
      }
      if (xHit === BOARD_SIZE || yHit === BOARD_SIZE) {
        return {
          called,
          unmarked,
        };
      }
    }
  }
  return undefined;
};

const getAllWinningBoards = (data: { input: number[]; boards: Board[] }) => {
  const winningBoards: Result[] = [];
  const winningIndexes: Set<number> = new Set();
  for (let i = 0; i < data.input.length; i++) {
    const target = data.input[i];

    for (let m = 0; m < data.boards.length; m++) {
      if (!winningIndexes.has(m)) {
        const result = winCalculator(target, data.boards[m]);
        if (result) {
          winningBoards.push(result);
          winningIndexes.add(m);
        }
      }
    }
  }
  return winningBoards;
};

const calculate = (input: string) => {
  const data = getBoardsAndInput(input);
  const result = getAllWinningBoards(data);
  return {
    first: result[0].unmarked * result[0].called,
    last: result[result.length - 1].unmarked * result[result.length - 1].called,
  };
};

export { calculate };
