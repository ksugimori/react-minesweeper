import React, { createContext, useState, useContext } from 'react';
import CellState from '../models/CellState';

// TODO: クラス化？
interface Field {
  rows: CellState[][];
}
interface Game {
  field: Field;
  openCell: (x: number, y: number) => void
}

const field: Field = {
  rows: [
    [
      { count: 1, isOpen: false },
      { count: 2, isOpen: true },
      { count: 3, isOpen: true },
    ],
    [
      { count: 4, isOpen: true },
      { count: 5, isOpen: false },
      { count: 6, isOpen: true },
    ],
    [
      { count: 7, isOpen: true },
      { count: 8, isOpen: true },
      { count: 9, isOpen: false },
    ]
  ]
};
const GameContext: React.Context<Game> = createContext({ field, openCell });
export const useGame = () => useContext(GameContext);

function openCell(x: number, y: number) {
  console.log(`click (${x}, ${y})`)
}

export default function GameProvider(props: any) {
  return (
    <GameContext.Provider value={{ field, openCell }}>
      {props.children}
    </GameContext.Provider>
  );
}