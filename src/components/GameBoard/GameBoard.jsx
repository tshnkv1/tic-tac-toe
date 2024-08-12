
import React from 'react';
import { useMachine } from '@xstate/react';

import { ticTacToeMachine } from '../../machines';
import { Board, Cell, RestartButton, StatusMessage } from '../index';



const GameBoard = () => {
  const [state, send] = useMachine(ticTacToeMachine);
  const { cells, currentPlayer } = state.context;

  const handleOnClick = (index) => {
    if(!cells[index]) {
      send({ type: 'PLAY', index });
    }
  };

  const handleClickRestart = () => {
    send({ type: 'RESTART' });
  }

  const renderGame = () => (
    !state.matches('finished') && !state.matches('draw')
      ? <Board>
          {cells.map((cell, index) => (
            <Cell
              key={index}
              onClick={() => handleOnClick(index)}
              disabled={!!cell}
              >
              {cell}
            </Cell>
          ))}
        </Board> 
      : <RestartButton onClick={handleClickRestart}>Restart</RestartButton>);

  return (
    <div>
      <StatusMessage>
        {state.matches('finished') && `Winner: ${currentPlayer}`}
        {state.matches('draw') && 'Draw!'}
        {state.matches('playing') && `Next Player: ${currentPlayer}`}
      </StatusMessage>
      {renderGame()}
    </div>
  );
};

export default GameBoard;
