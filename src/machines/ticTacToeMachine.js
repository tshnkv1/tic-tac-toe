import { createMachine, assign, sendTo } from 'xstate';
import { initialContext, players } from '../constants/constants';
import { chekingWinning } from '../utils/common/utils'


const ticTacToeMachine = createMachine({
  id: 'ticTacToe',
  initial: 'playing',
  context: initialContext,
  states: {
    playing: {
      on: {
        PLAY: {
          actions: ['setPlayerAction', 'resetIdleTimer'],
          target: 'checkWin',
        }
      },
      after: {
        10000: {target: 'idle' },
      }
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
    idle: {
      on: {
        RESET_IDLE: {
          target: 'playing',
          actions: 'resetBoard'
        },
      },
      entry: () => console.log('Player is unactive'), // if user is inactive more than 10 sec
    }
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

    resetIdleTimer: sendTo(() => {}, {type: 'RESET_IDLE'}),
  },
  guards: {
    isWinner: ({context: {cells}}) => chekingWinning(cells),
    isDraw: ({context: {cells}}) => cells.every(cell => cell!== null),
  },
});

export default ticTacToeMachine;
