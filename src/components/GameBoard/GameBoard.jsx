
import React from 'react';
import { useMachine } from '@xstate/react';

import { ticTacToeMachine } from '../../machines';
import { Board, Cell, CustomButton, StatusMessage } from '../index';



const GameBoard = () => {
  const [state, send] = useMachine(ticTacToeMachine);
  const { cells, currentPlayer } = state.context;

  const handleOnClick = (index) => {
    if (state.matches('idle')) {
      send({ type: 'RESET_IDLE' });
    } else if (!state.matches('finished')) {
      send({ type: 'PLAY', index });
    }
  };

  const handleClickRestart = () => {
    send({ type: 'RESTART' });
  }

  const handleContinue = () => {
    send({ type: 'RESET_IDLE' })
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
      : <CustomButton onClick={handleClickRestart}>Restart</CustomButton>);

  return (
    <div>
      <StatusMessage>
        {state.matches('finished') && `Winner: ${currentPlayer}`}
        {state.matches('draw') && 'Draw!'}
        {state.matches('playing') && `Next Player: ${currentPlayer}`}
      </StatusMessage>
      {renderGame()}
      {state.matches('idle') && (
        <CustomButton onClick={handleContinue}>Continue</CustomButton>
      )}
    </div>
  );
};

export default GameBoard;
