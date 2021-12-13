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

const initialField: Field = {
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
const tmp: Game = {
  field: initialField,
  openCell: (x, y) => { }
}
const GameContext: React.Context<Game> = createContext(tmp);
export const useGame = () => useContext(GameContext);

export default function GameProvider(props: any) {
  const [field, setField] = useState(initialField);

  const openCell = (x: number, y: number) => {
    const newField = { rows: field.rows.slice() }
    const cell = newField.rows[y][x]
    cell.isOpen = !cell.isOpen

    setField(newField);
  }

  return (
    <GameContext.Provider value={{ field, openCell }}>
      {props.children}
    </GameContext.Provider>
  );
}