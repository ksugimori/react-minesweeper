import React, { useState } from 'react';
import './App.scss';
import { Game } from './models/Game';
import MsField from './components/MsField';
import { Coordinate } from './models/interfaces';
import Cell from './models/Cell';

// TODO: これだとグローバルに一回しか初期化されない
const game = new Game();
game.initialize();

function App() {
  const [rows, setRows] = useState<Cell[][]>(game.field.rows);

  const openCell = (p: Coordinate) => {
    game.open(p.x, p.y);
    setRows(game.field.rows.slice())
  }

  return (
    <div className="App">
      <h1>React minesweeper</h1>
      <MsField rows={rows} onClickCell={openCell} />
    </div>
  );
}

export default App;
