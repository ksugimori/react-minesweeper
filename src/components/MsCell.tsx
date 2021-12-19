import React from 'react';
import './MsCell.scss';
import Cell from '../models/Cell';
import { useGame } from '../state/GameProvider';

/**
 * セル
 * @param props 
 * @returns セル
 */
export default function MsCell({ at, isOpen, count }: Cell) {
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
