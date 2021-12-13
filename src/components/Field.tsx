import React from 'react';
import './Field.scss';
import { useGame } from '../state/GameProvider'
import FieldRow from './FieldRow';

function Field() {
  const { field } = useGame();

  return (
    <div className="field">
      {field.rows.map((row, y) => <FieldRow key={y} y={y} cells={row}></FieldRow>)}
    </div>
  );
}

export default Field;
