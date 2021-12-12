import React from 'react';
import './App.scss';
import Cell from './components/Cell';
import CellState from './models/CellState';

function App() {
  const cellList: CellState[] = [
    { count: 1, isOpen: false },
    { count: 2, isOpen: true },
    { count: 3, isOpen: true },
  ];

  return (
    <div className="App">
      {cellList.map(cell => <Cell {...cell} />)}
    </div>
  );
}

export default App;
