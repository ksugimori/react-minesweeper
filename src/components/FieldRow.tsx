import React from 'react';
import './FieldRow.scss';
import Cell from './Cell';
import CellState from '../models/CellState';

/**
 * props
 */
interface Props {
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
export default function FieldRow({ y, cells }: Props) {
  return (
    <div className='flex-row'>
      {cells.map((cell, x) => <Cell key={x} at={{ x, y }} {...cell} />)}
    </div>
  );
}
