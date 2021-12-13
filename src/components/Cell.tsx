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
const Cell: React.FC<CellState & Point> = function ({ x, y, isOpen, count }) {
  const { openCell } = useGame();

  const classNameList = ['cell']
  isOpen && classNameList.push('cell-open')
  return (
    <div
      className={classNameList.join(' ')}
      onClick={() => openCell(x, y)}
    >
      {isOpen ? count : ''}
    </div>
  );
}

export default Cell;