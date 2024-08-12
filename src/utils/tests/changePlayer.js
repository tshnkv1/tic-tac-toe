import { screen, fireEvent } from '@testing-library/react';

export const makeMove = (button) => {
    fireEvent.click(button);
}

export const expectCorrectText = (text) => {
    expect(screen.getByText(text)).toBeInTheDocument();
};

export const changePlayerAction = (button, text) => {
    makeMove(button);
    expectCorrectText(text);
}