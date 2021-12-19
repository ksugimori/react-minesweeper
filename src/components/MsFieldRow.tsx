import React from 'react';
import './MsFieldRow.scss';
import MsCell from './MsCell';
import Cell from '../models/Cell';

/**
 * props
 */
interface Props {
  /** セル */
  cells: Cell[];
}

/**
 * Field の１行
 * @param param0 props
 * @returns 行
 */
export default function MsFieldRow({ cells }: Props) {
  return (
    <div className='flex-row'>
      {cells.map(cell => <MsCell key={cell.id} {...cell} />)}
    </div>
  );
}
