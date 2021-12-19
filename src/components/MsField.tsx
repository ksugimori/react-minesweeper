import React from 'react';
import './MsField.scss';
import { useGame } from '../state/GameProvider'
import MsFieldRow from './MsFieldRow';

function MsField() {
  const { field } = useGame();

  return (
    <div className="field">
      {field.rows.map((row, y) => <MsFieldRow key={y} cells={row}></MsFieldRow>)}
    </div>
  );
}

export default MsField;
