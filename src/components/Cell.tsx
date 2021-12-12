import React from 'react';
import './cell.scss';
import CellState from '../models/CellState';

/**
 * セル
 * @param props 
 * @returns セル
 */
const Cell: React.FC<CellState> = function (props) {
  const classNameList = ['cell']
  props.isOpen && classNameList.push('cell-open')
  return (
    <div className={classNameList.join(' ')}>
      {props.isOpen ? props.count : ''}
    </div>
  );
}

export default Cell;