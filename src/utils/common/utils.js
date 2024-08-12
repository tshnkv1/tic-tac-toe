import { conbinationData } from "../../constants/constants";

export const chekingWinning = (cells) => {
    for (let [a, b, c] of conbinationData) {
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
  
    return null;
  };