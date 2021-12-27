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

// TODO: ランダムに設定
const defaultMines = new PointSet()
defaultMines.add({ x: 3, y: 0 })

export default function MsField() {


  const [state, setState] = useState<MsFieldState>({
    width: 9, height: 9, mines: defaultMines, openCells: new PointSet()
  })

  const openCell = (p: Point) => {
    const newOpenCells = state.openCells.clone()
    newOpenCells.add(p);
    setState({ ...state, openCells: newOpenCells })
  }


  const rows = [];
  for (let y = 0; y < state.height; y++) {
    const row = [];
    for (let x = 0; x < state.width; x++) {
      row.push(<MsCell
        key={x}
        count={state.mines.countNeighbors({ x, y })}
        isOpen={state.openCells.includes({ x, y })}
        onClick={() => openCell({ x, y })}
      />)
    }
    rows.push((
      <div key={y} className="field-row">
        {row}
      </div>
    ))
  }

  return (
    <div className="field">
      {rows}
    </div>
  );
}