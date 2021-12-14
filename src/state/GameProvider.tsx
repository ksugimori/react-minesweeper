import React, { createContext, useState, useContext } from 'react';
import CellState from '../models/CellState';
import Point from '../models/Point';

// TODO: クラス化？
interface Field {
  rows: CellState[][];
}
interface Game {
  field: Field;
  openCell: (p: Point) => void
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
const initialValue: Game = {
  field: initialField,
  openCell: p => { }
}
const GameContext: React.Context<Game> = createContext(initialValue);
export const useGame = () => useContext(GameContext);

function GameProvider({ children }: { children: React.ReactNode }) {
  const [field, setField] = useState(initialField);

  const openCell = (p: Point) => {
    const newField = { rows: field.rows.slice() }
    const cell = newField.rows[p.y][p.x]
    cell.isOpen = !cell.isOpen

    setField(newField);
  }

  return (
    <GameContext.Provider value={{ field, openCell }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;