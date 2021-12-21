import React from 'react';
import './MsField.scss';
import { useGame } from '../state/GameProvider'
import MsCell from './MsCell';
import Cell from '../models/Cell';

/**
 * MsField の１行を作る
 * @param cells この行に表示するセル
 * @param y Y座標
 * @returns 行
 */
const toFieldRow = (cells: Cell[], y: number) => (
  <div className='ms-field-row' key={y}>
    {cells.map(cell => <MsCell key={cell.id} {...cell} />)}
  </div>
);

/**
 * フィールド
 * @returns MsField
 */
function MsField() {
  const { field } = useGame();

  return (
    <div className="ms-field">
      {field.rows.map(toFieldRow)}
    </div>
  );
}

export default MsField;
