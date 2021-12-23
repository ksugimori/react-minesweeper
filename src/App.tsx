import React, { useState } from 'react';
import './App.scss';
import { Game } from './models/Game';
import MsField from './components/MsField';
import { Coordinate } from './models/interfaces';

// TODO: これだとグローバルに一回しか初期化されない
const game = new Game();
game.initialize();

function App() {
  const [x, setCount] = useState(0);

  const openCell = (p: Coordinate) => {
    game.open(p.x, p.y);
    setCount(x + 1); // TODO: こうすれば強制的に再描画できるが効率悪い？
  };

  return (
    <div className="App">
      <h1>React minesweeper</h1>
      <MsField field={game.field} onClickCell={openCell} />
    </div>
  );
}

export default App;
