import React from 'react';
import './MsField.scss';
import MsCell from './MsCell';
import Cell from '../models/Cell';
import Field from '../models/Field';
import Point from '../models/Point';

type Props = {
  field: Field;
  onClickCell: (p: Point) => void
}

/**
 * フィールド
 * @returns MsField
 */
function MsField({ field, onClickCell }: Props) {
  const toMsCell = (cell: Cell, x: number, y: number) => (
    <MsCell key={cell.id} onClick={onClickCell} {...cell} />
  );

  const toMsFieldRow = (cells: Cell[], y: number) => (
    <div className='ms-field-row' key={y}>
      {cells.map((cell, x) => toMsCell(cell, x, y))}
    </div>
  );

  return (
    <div className="ms-field">
      {field.rows.map(toMsFieldRow)}
    </div>
  );
}

export default MsField;
