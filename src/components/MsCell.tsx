import React from 'react';
import './MsCell.scss';
import Cell from '../models/Cell';
import Point from '../models/Point';

/**
 * props
 */
type Props = Cell & {
  onClick: (p: Point) => void
}

/**
 * セル
 * @param props 
 * @returns セル
 */
export default function MsCell({ at, isOpen, count, onClick = x => { } }: Props) {
  const classNameList = ['cell']
  isOpen && classNameList.push('cell-open')
  return (
    <div
      className={classNameList.join(' ')}
      onClick={() => onClick(at)}
    >
      {isOpen ? count : ''}
    </div>
  );
}
