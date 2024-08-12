import { render } from '@testing-library/react';

import { expectCorrectText } from '../../utils/tests/changePlayer';
import { App } from '../index';

test('WHEN content will ready THEN all system headers will appear', () => {
  // WHEN
  render(<App />);

  // THEN
  expectCorrectText('Tic Tac Toe Game');
  expectCorrectText('Next Player: X');
});
