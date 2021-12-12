import React from 'react';
import './cell.scss';
import CellState from '../models/CellState';
import { useGame } from '../state/GameProvider';

/**
 * セル
 * @param props 
 * @returns セル
 */
const Cell: React.FC<CellState> = function (props) {
  const { openCell } = useGame();

  const classNameList = ['cell']
  props.isOpen && classNameList.push('cell-open')
  return (
    <div
      className={classNameList.join(' ')}
      onClick={e => openCell(0, 0)}
    >
      {props.isOpen ? props.count : ''}
    </div>
  );
}

export default Cell;