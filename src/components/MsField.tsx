import React, { useState } from 'react';
import Point from '../models/Point';
import PointSet from '../models/PointSet';
import MsCell from "./MsCell";
import "./MsField.scss";

interface Cell {
  at: Point;
  count: number;
  isMine: boolean;
  isOpen: boolean;
}

interface MsFieldState {
  width: number;
  height: number;
  mines: PointSet;
  openCells: PointSet;
}

/**
 * 0 から始まる連番の配列を作成する。
 * @param length 長さ
 * @returns 配列
 */
function sequence(length: number): number[] {
  return Array.from({ length }, (e, i) => i);
}

// TODO: ランダムに設定
const defaultMines = new PointSet()
defaultMines.add({ x: 3, y: 0 })
defaultMines.add({ x: 4, y: 1 })

export default function MsField() {

  const [state, setState] = useState<MsFieldState>({
    width: 9,
    height: 9,
    mines: defaultMines,
    openCells: new PointSet()
  })

  const [openQueue, setOpenQueue] = useState<PointSet>(new PointSet());

  const cells: Cell[][] = [];
  for (let y = 0; y < state.height; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < state.width; x++) {
      const p = { x, y };
      row.push({
        at: p,
        count: state.mines.countNeighbors(p),
        isMine: state.mines.includes(p),
        isOpen: state.openCells.includes(p)
      })
    }

    cells.push(row);
  }

  if (openQueue.isNotEmpty()) {
    const newOpenCells = state.openCells.clone()
    const newOpenQueue = new PointSet();
    openQueue.forEach(p => {
      if (p.x < 0 || p.x >= state.width || p.y < 0 || p.y >= state.height) {
        return;
      }

      newOpenCells.add(p);
      const cell = cells[p.y][p.x];
      if (cell && !cell.isOpen && cell.count === 0) {
        newOpenQueue.add({ x: p.x - 1, y: p.y - 1 });
        newOpenQueue.add({ x: p.x - 1, y: p.y });
        newOpenQueue.add({ x: p.x - 1, y: p.y + 1 });
        newOpenQueue.add({ x: p.x, y: p.y - 1 });
        newOpenQueue.add({ x: p.x, y: p.y + 1 });
        newOpenQueue.add({ x: p.x + 1, y: p.y - 1 });
        newOpenQueue.add({ x: p.x + 1, y: p.y });
        newOpenQueue.add({ x: p.x + 1, y: p.y + 1 });
      }
    })
    setState({ ...state, openCells: newOpenCells })
    setOpenQueue(newOpenQueue);
  }

  const openCell = (p: Point) => {
    const newOpenCells = state.openCells.clone()
    newOpenCells.add(p);
    openQueue.forEach(e => newOpenCells.add(e));
    setState({ ...state, openCells: newOpenCells })

    const cell = cells[p.y][p.x];
    if (cell && !cell.isOpen && cell.count === 0) {
      const newOpenQueue = new PointSet();
      newOpenQueue.add({ x: p.x - 1, y: p.y - 1 });
      newOpenQueue.add({ x: p.x - 1, y: p.y });
      newOpenQueue.add({ x: p.x - 1, y: p.y + 1 });
      newOpenQueue.add({ x: p.x, y: p.y - 1 });
      newOpenQueue.add({ x: p.x, y: p.y + 1 });
      newOpenQueue.add({ x: p.x + 1, y: p.y - 1 });
      newOpenQueue.add({ x: p.x + 1, y: p.y });
      newOpenQueue.add({ x: p.x + 1, y: p.y + 1 });
      setOpenQueue(newOpenQueue);
    }
  }

  const createMsCell = (x: number, y: number) => {
    const p = { x, y };
    return (
      <MsCell key={x} {...cells[y][x]} onClick={() => openCell(p)} />
    );
  }

  const rows = sequence(state.height).map(y => (
    <div key={y} className="field-row">
      {sequence(state.width).map(x => createMsCell(x, y))}
    </div>
  ));

  return (
    <div className="field-container">
      <div className='field'>
        <div className='field-row-container'>
          {rows}
        </div>
      </div>
    </div>
  );
}