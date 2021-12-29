import React, { useState } from 'react';
import Field from '../models/Field';
import Point from '../models/Point';
import PointSet from '../models/PointSet';
import MsCell from "./MsCell";
import "./MsField.scss";

interface MsFieldState {
  width: number;
  height: number;
  mines: PointSet;
  openCells: PointSet;
  openQueue: PointSet;
}

/**
 * 0 から始まる連番の配列を作成する。
 * @param length 長さ
 * @returns 配列
 */
function sequence(length: number): number[] {
  return Array.from({ length }, (e, i) => i);
}

// TODO: ランダムに設定
const defaultMines = new PointSet()
defaultMines.add({ x: 3, y: 0 })
defaultMines.add({ x: 4, y: 1 })
defaultMines.add({ x: 8, y: 0 })
defaultMines.add({ x: 8, y: 1 })
defaultMines.add({ x: 7, y: 2 })
defaultMines.add({ x: 8, y: 2 })

export default function MsField() {

  const [state, setState] = useState<MsFieldState>({
    width: 9,
    height: 9,
    mines: defaultMines,
    openCells: new PointSet(),
    openQueue: new PointSet()
  })

  const { openQueue } = state;

  const field = new Field(state.width, state.height);

  state.openCells.toArray().forEach(p => field.at(p).isOpen = true)
  state.mines.toArray().forEach(p => {
    field.at(p).isMine = true;
    field.arround(p).forEach(cell => cell.count++)
  });

  if (openQueue.size > 0) {

    console.log('length = ' + openQueue.size)

    const newOpenCells = state.openCells.clone()
    const newOpenQueue = new PointSet();

    openQueue.toArray()
      .filter(p => !newOpenCells.includes(p))
      .forEach(p => newOpenCells.add(p))

    openQueue.toArray()
      .filter(p => field.at(p).count === 0)
      .forEach(p => {
        field.arround(p).map(cell => cell.at)
          .filter(at => !newOpenCells.includes(at))
          .forEach(at => newOpenQueue.add(at))
      })

    setState({ ...state, openCells: newOpenCells, openQueue: newOpenQueue })
  }

  const openCell = (p: Point) => {
    const newOpenCells = state.openCells.clone()
    newOpenCells.add(p);
    openQueue.toArray().forEach(e => newOpenCells.add(e));

    const newOpenQueue = new PointSet();
    const cell = field.at(p);
    if (!cell.isOpen && cell.count === 0) {
      field.arround(p).map(cell => cell.at)
        .filter(at => !newOpenCells.includes(at))
        .forEach(at => newOpenQueue.add(at))
    }

    setState({ ...state, openCells: newOpenCells, openQueue: newOpenQueue })
  }

  const createMsCell = (x: number, y: number) => {
    const p = { x, y };
    return (
      <MsCell key={x} {...field.at(p)} onClick={() => openCell(p)} />
    );
  }

  const rows = sequence(state.height).map(y => (
    <div key={y} className="field-row">
      {sequence(state.width).map(x => createMsCell(x, y))}
    </div>
  ));

  return (
    <div className="field-container">
      <div className='field'>
        <div className='field-row-container'>
          {rows}
        </div>
      </div>
    </div>
  );
}