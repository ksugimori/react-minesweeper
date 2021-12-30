import React, { useState } from 'react';
import Field from '../models/Field';
import Point from '../models/Point';
import PointSet from '../models/PointSet';
import MsCell from "./MsCell";
import "./MsField.scss";

/**
 * Field の状態
 */
interface MsFieldState {
  /** 盤の横セル数 */
  width: number;

  /** 盤の縦セル数 */
  height: number;

  /** 地雷の埋まっているセルの座標 */
  minePoints: PointSet;

  /** フラグの立てられているセルの座標 */
  flagPoints: PointSet;

  /** 開かれているセルの座標 */
  openPoints: PointSet;

  /** 開く必要のあるセルの座標。次回描画時に値が入っていればそれらを開く */
  openPointsQueue: PointSet;
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
    flagPoints: new PointSet(),
    openPoints: new PointSet(),
    openPointsQueue: new PointSet()
  })

  const field = buildField(state);

  // キューに値が入っている場合はそれらを開く
  if (state.openPointsQueue.size > 0) {
    const newOpenPoints = state.openPoints.clone()
    const newOpenPointsQueue = new PointSet();

    // キューに入っている座標のセルを開く
    state.openPointsQueue.toArray()
      .forEach(p => newOpenPoints.add(p));

    // 開いたセルがまた空白セルなら、周囲の座標を新たにキューに入れる
    state.openPointsQueue.toArray()
      .filter(p => field.at(p).count === 0)
      .flatMap(p => field.arround(p).map(cell => cell.at))
      .filter(p => !newOpenPoints.includes(p))
      .filter(p => !state.flagPoints.includes(p))
      .forEach(p => newOpenPointsQueue.add(p));

    // ここで state を更新するので再び MsField が実行される。キューが空になるまで再帰的に実行される
    setState({ ...state, openPoints: newOpenPoints, openPointsQueue: newOpenPointsQueue })
  }

  const onClickCell = (clickedPoint: Point) => {
    const cell = field.at(clickedPoint);
    const newOpenPoints = state.openPoints.clone();
    const newOpenPointsQueue = new PointSet();

    if (cell.isFlag) {
      return;
    }

    // すでに開かれてるセルの場合、
    if (cell.isOpen && cell.count > 0) {
      // count と同じ数のフラグが立てられていれば、それ以外のセルは開く
      if (cell.count === field.arround(clickedPoint).filter(cell => cell.isFlag).length) {
        field.arround(clickedPoint).map(cell => cell.at)
          .filter(p => !newOpenPoints.includes(p))
          .filter(p => !state.flagPoints.includes(p))
          .forEach(p => newOpenPoints.add(p));

        setState({ ...state, openPoints: newOpenPoints })

        return;
      }
    }

    newOpenPoints.add(clickedPoint);

    if (cell.count === 0) {
      field.arround(clickedPoint).map(cell => cell.at)
        .filter(p => !newOpenPoints.includes(p))
        .filter(p => !state.flagPoints.includes(p))
        .forEach(p => newOpenPointsQueue.add(p))
    }

    setState({ ...state, openPoints: newOpenPoints, openPointsQueue: newOpenPointsQueue })
  }

  const onRightClickCell = (p: Point) => {
    if (field.at(p).isOpen) return;

    const newFlagPoints = state.flagPoints.clone();
    if (newFlagPoints.includes(p)) {
      newFlagPoints.remove(p);
    } else {
      newFlagPoints.add(p);
    }

    setState({ ...state, flagPoints: newFlagPoints })
  }

  // ----------------------------------------------------------
  // ここから下はビューの組み立て
  // ----------------------------------------------------------
  const createMsCell = (x: number, y: number) => {
    const p = { x, y };
    const cell = field.at(p);
    return (
      <MsCell
        key={x}
        {...cell}
        onLeftClick={() => onClickCell(p)}
        onRightClick={() => onRightClickCell(p)}
      />
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

// ------------------------------------------------------------
// module private
// ------------------------------------------------------------

/**
 * 0 から始まる連番の配列を作成する。
 * @param length 長さ
 * @returns 配列
 */
function sequence(length: number): number[] {
  return Array.from({ length }, (e, i) => i);
}

/**
 * state から Field を組み立てなおす。
 * @param state Fieldの状態
 * @returns Field
 */
function buildField(state: MsFieldState) {
  const result = new Field(state.width, state.height);

  state.minePoints.toArray().forEach(p => {
    result.at(p).isMine = true;
    result.arround(p).forEach(cell => cell.count++);
  });
  state.openPoints.toArray().forEach(p => result.at(p).isOpen = true);
  state.flagPoints.toArray()
    .filter(p => !state.openPoints.includes(p))
    .forEach(p => result.at(p).isFlag = true);

  return result;
}
