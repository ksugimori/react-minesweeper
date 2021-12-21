import React from 'react';
import './App.scss';
import { useGame } from './state/GameProvider'
import MsField from './components/MsField';

function App() {
  const { field, openCell } = useGame();

  return (
    <div className="App">
      <h1>React minesweeper</h1>
      <MsField field={field} onClickCell={openCell} />
    </div>
  );
}

export default App;
