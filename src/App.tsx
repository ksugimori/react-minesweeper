import React from 'react';
import './App.scss';
import MsCell from './components/MsCell';

function App() {
  return (
    <div className="App">
      <h1>React minesweeper</h1>
      <MsCell count={8} />
    </div>
  );
}

export default App;
