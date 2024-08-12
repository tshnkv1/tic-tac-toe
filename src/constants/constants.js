export const conbinationData = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
export const players = {
    X: 'X',
    O: 'O',
}
  
export const initialContext = {
    cells: Array(9).fill(null),
    currentPlayer: 'X',
};