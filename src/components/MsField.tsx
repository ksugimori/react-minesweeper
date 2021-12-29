import React, { useState } from 'react';
import Field from '../models/Field';
import Point from '../models/Point';
import PointSet from '../models/PointSet';
import MsCell from "./MsCell";
import "./MsField.scss";

interface MsFieldState {
  /** 盤の横セル数 */
  width: number;

  /** 盤の縦セル数 */
  height: number;

  /** 地雷の埋まっているセルの座標 */
  minePoints: PointSet;

  /** 開かれているセルの座標 */
  openPoints: PointSet;

  /** 開く必要のあるセルの座標。次回描画時に値が入っていればそれらを開く */
  openPointsQueue: PointSet;
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

/**
 * ゲームの盤面を表すコンポーネント。
 * @returns Field
 */
export default function MsField() {

  const [state, setState] = useState<MsFieldState>({
    width: 9,
    height: 9,
    minePoints: defaultMines,
    openPoints: new PointSet(),
    openPointsQueue: new PointSet()
  })

  const { openPointsQueue } = state;

  const field = new Field(state.width, state.height);

  state.openPoints.toArray().forEach(p => field.at(p).isOpen = true)
  state.minePoints.toArray().forEach(p => {
    field.at(p).isMine = true;
    field.arround(p).forEach(cell => cell.count++)
  });

  if (openPointsQueue.size > 0) {
    const newOpenPoints = state.openPoints.clone()
    const newOpenPointsQueue = new PointSet();

    openPointsQueue.toArray()
      .forEach(p => newOpenPoints.add(p))

    openPointsQueue.toArray()
      .filter(p => field.at(p).count === 0)
      .flatMap(p => field.arround(p).map(cell => cell.at))
      .filter(p => !newOpenPoints.includes(p))
      .forEach(p => newOpenPointsQueue.add(p));

    setState({ ...state, openPoints: newOpenPoints, openPointsQueue: newOpenPointsQueue })
  }

  const onClickCell = (p: Point) => {
    const newOpenCells = state.openPoints.clone()
    newOpenCells.add(p);
    openPointsQueue.toArray().forEach(e => newOpenCells.add(e));

    const newOpenQueue = new PointSet();
    const cell = field.at(p);
    if (!cell.isOpen && cell.count === 0) {
      field.arround(p).map(cell => cell.at)
        .filter(at => !newOpenCells.includes(at))
        .forEach(at => newOpenQueue.add(at))
    }

    setState({ ...state, openPoints: newOpenCells, openPointsQueue: newOpenQueue })
  }

  const createMsCell = (x: number, y: number) => {
    const p = { x, y };
    return (
      <MsCell key={x} {...field.at(p)} onClick={() => onClickCell(p)} />
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