import React from 'react';
import './FieldRow.scss';
import Cell from './Cell';
import CellState from '../models/CellState';

/**
 * props
 */
type Props = {
  /** y座標 */
  y: number;

  /** セル */
  cells: CellState[];
}

/**
 * Field の１行
 * @param param0 props
 * @returns 行
 */
const FieldRow: React.FC<Props> = function ({ y, cells }) {
  return (
    <div className='flex-row'>
      {cells.map((cell, x) => <Cell key={x} x={x} y={y} {...cell} />)}
    </div>
  );
}

export default FieldRow;
