import React from 'react';
import './MsField.scss';
import MsCell from './MsCell';
import Cell from '../models/Cell';
import { Coordinate } from '../models/interfaces'

type Props = {
  rows: Cell[][];
  onClickCell: (p: Coordinate) => void
}

/**
 * フィールド
 * @returns MsField
 */
function MsField({ rows, onClickCell }: Props) {
  const toMsCell = (cell: Cell, x: number, y: number) => (
    <MsCell key={`${x}:${y}`} at={{ x, y }} onClick={onClickCell} {...cell} />
  );

  const toMsFieldRow = (cells: Cell[], y: number) => (
    <div className='ms-field-row' key={y}>
      {cells.map((cell, x) => toMsCell(cell, x, y))}
    </div>
  );

  return (
    <div className="ms-field">
      {rows.map(toMsFieldRow)}
    </div>
  );
}

export default MsField;
