import React from 'react';
import './App.scss';
import MsField from './components/MsField';

function App() {
  return (
    <div className="App">
      <h1>React minesweeper</h1>
      <MsField width={9} height={9} />
    </div>
  );
}

export default App;
