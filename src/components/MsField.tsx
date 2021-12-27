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

export default function MsField() {


  const [state, setState] = useState<MsFieldState>({
    width: 9, height: 9, mines: new PointSet(), openCells: new PointSet()
  })

  const openCell = (i: number) => {
    const newOpenCells = state.openCells.clone()
    newOpenCells.add({ x: i, y: 0 });
    setState({ ...state, openCells: newOpenCells })
  }


  const row = [];
  for (let x = 0; x < state.width; x++) {
    const isOpen = state.openCells.includes({ x: x, y: 0 })

    row.push(<MsCell
      key={x}
      count={x} // TODO: 実際のカウントに
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