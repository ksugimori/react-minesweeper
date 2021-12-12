import React from 'react';
import './App.scss';
import Cell from './components/Cell';
import { useGame } from './state/GameProvider';

function App() {
  const { game } = useGame();

  return (
    <div className="App">
      {game.cells[0].map(cell => <Cell {...cell} />)}
    </div>
  );
}

export default App;
