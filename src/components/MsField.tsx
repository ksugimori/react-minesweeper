import React, { useState } from 'react';
import Point from '../models/Point';
import MsCell from "./MsCell";
import "./MsField.scss";

interface MsFieldState {
  width: number;
  height: number;
  mines: Point[];
  openCells: Point[];
}

export default function MsField() {


  const [state, setState] = useState<MsFieldState>({
    width: 9, height: 9, mines: [], openCells: []
  })

  const openCell = (i: number) => {
    const openCells = [...state.openCells, { x: i, y: 0 }];
    setState({ ...state, openCells })
  }


  const row = [];
  for (let x = 0; x < state.width; x++) {
    const isOpen = state.openCells.map(p => p.x).includes(x);

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