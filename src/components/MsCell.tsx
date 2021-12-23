import React from 'react';
import './MsCell.scss';
import { Coordinate } from '../models/interfaces'

/**
 * props
 */
type Props = {
  at: Coordinate,
  isOpen: boolean,
  count: number,
  onClick: (p: Coordinate) => void
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
