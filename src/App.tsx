import React from 'react';
import './App.scss';
import Cell from './components/Cell';
import { useGame } from './state/GameProvider';

function App() {
  const { field } = useGame();

  const divs = field.rows
    // 各要素を <Cell> に変換
    .map((row, y) => {
      return row.map((cell, x) => {
        return <Cell key={`${x}:${y}`} {...cell} />;
      });
    })
    // 行単位で <div> で囲う
    .map((cells, y) => <div key={y} className='flex-row'>{cells}</div>);

  return (
    <div className="App">
      {divs}
    </div>
  );
}

export default App;
