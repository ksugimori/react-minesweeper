import React from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import MsField from './components/MsField';
import { selectStatus } from './features/game/gameSlice';

function App() {
  const status = useSelector(selectStatus);

  return (
    <div className="App">
      <h1>React minesweeper</h1>
      <p>{status}</p>
      <MsField />
    </div>
  );
}

export default App;
