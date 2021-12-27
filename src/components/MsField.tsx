import React, { useState } from 'react';
import Point from '../models/Point';
import PointSet from '../models/PointSet';
import MsCell from "./MsCell";
import "./MsField.scss";

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
    width: 9, height: 9, mines: defaultMines, openCells: new PointSet()
  })

  const openCell = (p: Point) => {
    const newOpenCells = state.openCells.clone()
    newOpenCells.add(p);
    setState({ ...state, openCells: newOpenCells })
  }

  const createMsCell = (x: number, y: number) => {
    const p = { x, y };
    return (
      <MsCell
        key={x}
        count={state.mines.countNeighbors(p)}
        isMine={state.mines.includes(p)}
        isOpen={state.openCells.includes(p)}
        onClick={() => openCell(p)}
      />
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