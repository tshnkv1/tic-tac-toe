import { createMachine, assign } from 'xstate';

import { initialContext, players } from '../constants/constants';
import { chekingWinning } from '../utils/utils'

const ticTacToeMachine = createMachine({
  id: 'ticTacToe',
  initial: 'playing',
  context: initialContext,
  states: {
    playing: {
      on: {
        PLAY: {
          actions: 'setPlayerAction',
          target: 'checkWin',
        }
      },
    },
    checkWin: {
      always: [
        { target: 'finished', guard: 'isWinner' },
        { target: 'draw', guard: 'isDraw' },
        { target: 'playing', actions: 'switchPlayer' },
      ],
    },
    finished: {
      on: {
        RESTART: { target: 'playing', actions: 'resetGame' }
      }
    },
    draw: {
      on: {
        RESTART: { target: 'playing', actions: 'resetGame' }
      }
    },
  },
}, {
  actions: {
    setPlayerAction: assign(({context, event}) => {
      const { cells, currentPlayer } = context;
      const newCells = [...cells];

      newCells[event.index] = currentPlayer; // set correct sign to cell (depends of currect player: X or O)
      
      return {
        cells: newCells,
      };
    }),

    switchPlayer: assign(({context: {currentPlayer}}) => ({
      currentPlayer: currentPlayer === players.X ? players.O : players.X,
    })),

    resetGame: assign(() => ({...initialContext})),
  },
  guards: {
    isWinner: ({context: {cells}}) => chekingWinning(cells),
    isDraw: ({context: {cells}}) => cells.every(cell => cell!== null),
  },
});

export default ticTacToeMachine;
