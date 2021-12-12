import React, { createContext, useState, useContext } from 'react';
import CellState from '../models/CellState';

// TODO: クラス化？
interface Game {
  cells: CellState[][];
}
interface IGameContext {
  game: Game;
  openCell: (x: number, y: number) => void
}


const defaultGame: Game = {
  cells: [
    [
      { count: 1, isOpen: false },
      { count: 2, isOpen: true },
      { count: 3, isOpen: true },
    ]
  ]
};
const GameContext: React.Context<IGameContext> = createContext({
  game: defaultGame, openCell: (x, y) => {

  }
});
export const useGame = () => useContext(GameContext);

export default function GameProvider(props: any) {
  return (
    <GameContext.Provider value={{ game: defaultGame, openCell: (x, y) => console.log(`click (${x}, ${y})`) }}>
      {props.children}
    </GameContext.Provider>
  );
}