import React, { createContext, useState, useContext } from 'react';
import Cell from '../models/Cell';
import Field from '../models/Field';
import Point from '../models/Point';

// TODO: クラス化？
interface Game {
  field: Field;
  openCell: (p: Point) => void
}

const initialField: Field = {
  rows: [
    [
      new Cell({ x: 0, y: 0 }),
      new Cell({ x: 1, y: 0 }),
      new Cell({ x: 2, y: 0 })
    ],
    [
      new Cell({ x: 0, y: 1 }),
      new Cell({ x: 1, y: 1 }),
      new Cell({ x: 2, y: 1 })
    ],
    [
      new Cell({ x: 0, y: 2 }),
      new Cell({ x: 1, y: 2 }),
      new Cell({ x: 2, y: 2 })
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