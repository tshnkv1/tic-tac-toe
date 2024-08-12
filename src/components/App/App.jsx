import React from "react";

import { GameBoard, Header, Layout } from '../index';

const App = () => {
  return (
    <Layout>
      <Header>Tic Tac Toe Game</Header>
      <GameBoard />
    </Layout>
  );
}

export default App;
