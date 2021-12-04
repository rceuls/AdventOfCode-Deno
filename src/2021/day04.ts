const BOARD_SIZE = 5;

type Board = {
  index: number;
  items: { val: number; hit: boolean; x: number; y: number }[];
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
    const lines = raw.replace(" ", " ").split("\n");
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        board.items.push({
          hit: false,
          val: +lines[i].slice(0 + 3 * j, 3 + 3 * j).trim(),
          x: i,
          y: j,
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

const winCalculator = (target: number, board: Board) => {
  let shouldCheck = false;
  for (let j = 0; j < board.items.length; j++) {
    if (board.items[j].val === target) {
      board.items[j].hit = true;
      shouldCheck = true;
    }
    if (shouldCheck) {
      for (let k = 0; k < BOARD_SIZE; k++) {
        const isWin =
          board.items.filter((x) => x.x === k && x.hit).length === BOARD_SIZE ||
          board.items.filter((x) => x.y === k && x.hit).length === BOARD_SIZE;
        if (isWin) {
          return {
            called: target,
            unmarked: board.items
              .filter((x) => !x.hit)
              .reduce((p, n) => p + n.val, 0),
          };
        }
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
        const board = data.boards[m];
        const result = winCalculator(target, board);
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
