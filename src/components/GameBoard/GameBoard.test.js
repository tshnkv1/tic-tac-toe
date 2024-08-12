import { render, screen } from '@testing-library/react';

import { makeMove, changePlayerAction, expectCorrectText } from '../../utils/tests/changePlayer';
import { GameBoard } from '../index';

test('WHEN a player presses the button THEN the turn goes to another player', () => {
  // WHEN
  render(<GameBoard/>);

  const buttons = screen.getAllByRole('button');

  // THEN
  changePlayerAction(buttons[0], 'Next Player: O');
  changePlayerAction(buttons[1], 'Next Player: X');
});

test('WHEN a winning combination is played THEN test with the correct winner and button restart are displayed', () => {
  // WHEN
  render(<GameBoard />);

  const buttons = screen.getAllByRole('button');

  makeMove(buttons[0]); // X
  makeMove(buttons[3]); // O
  makeMove(buttons[1]); // X
  makeMove(buttons[4]); // O
  makeMove(buttons[2]); // X wins

  // THEN
  expectCorrectText('Winner: X');
  expect(screen.getByRole('button', { name: 'Restart'})).toBeInTheDocument();
});

test('WHEN a game is played and no one has won THEN information is displayed', () => {
  // WHEN
  render(<GameBoard />);

  const moves = [0, 1, 2, 4, 3, 5, 7, 6, 8];
  const buttons = screen.getAllByRole('button');

  moves.forEach(index => makeMove(buttons[index]));

  // THEN
  expectCorrectText('Draw!');
  expect(screen.getByRole('button', { name: 'Restart'})).toBeInTheDocument();
});
