import React, { useState } from 'react';
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

  const openCell = (i: number) => {
    const newOpenCells = state.openCells.clone()
    newOpenCells.add({ x: i, y: 0 });
    setState({ ...state, openCells: newOpenCells })
  }


  const row = [];
  for (let x = 0; x < state.width; x++) {
    const isOpen = state.openCells.includes({ x: x, y: 0 })
    const count = state.mines.countNeighbors({ x: x, y: 0 });

    row.push(<MsCell
      key={x}
      count={count}
      isOpen={isOpen}
      onClick={() => openCell(x)}
    />)
  }

  return (
    <div className="field">
      <div className="field-row">
        {row}
      </div>
    </div>
  );
}