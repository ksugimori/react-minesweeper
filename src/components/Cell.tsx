import React from 'react';
import './Cell.scss';
import CellState from '../models/CellState';
import Point from '../models/Point';
import { useGame } from '../state/GameProvider';

/**
 * セル
 * @param props 
 * @returns セル
 */
export default function Cell({ at, isOpen, count }: { at: Point } & CellState) {
  const { openCell } = useGame();

  const classNameList = ['cell']
  isOpen && classNameList.push('cell-open')
  return (
    <div
      className={classNameList.join(' ')}
      onClick={() => openCell(at)}
    >
      {isOpen ? count : ''}
    </div>
  );
}
