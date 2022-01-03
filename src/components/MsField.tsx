import React, { useState } from 'react';
import Field from '../models/Field';
import Point from '../models/Point';
import PointSet from '../models/PointSet';
import MsCell from "./MsCell";
import "./MsField.scss";

/**
 * 親要素から渡される props
 */
interface Props {
  /** 盤の横セル数 */
  width: number;

  /** 盤の縦セル数 */
  height: number;
}

/**
 * Field の状態
 */
interface MsFieldState {
  /** 地雷の埋まっているセルの座標 */
  minePoints: PointSet;

  /** フラグの立てられているセルの座標 */
  flagPoints: PointSet;

  /** 開かれているセルの座標 */
  openPoints: PointSet;
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
export default function MsField({ width, height }: Props) {

  const [state, setState] = useState<MsFieldState>({
    minePoints: defaultMines,
    flagPoints: new PointSet(),
    openPoints: new PointSet()
  })

  // 開く必要のあるセルの座標。次回描画時に値が入っていればそれらを開く
  const [queue, setQueue] = useState(new PointSet());

  const field = buildField(width, height, state);

  // キューに値が入っている場合はそれらを開く
  if (queue.size > 0) {
    const newOpenPoints = state.openPoints.clone()
    const newQueue = new PointSet();

    // キューに入っている座標のセルを開く
    queue.toArray()
      .forEach(p => newOpenPoints.add(p));

    // 開いたセルがまた空白セルなら、周囲の座標を新たにキューに入れる
    queue.toArray()
      .filter(p => field.at(p).count === 0)
      .flatMap(p => field.arround(p).map(cell => cell.at))
      .filter(p => !newOpenPoints.includes(p))
      .filter(p => !state.flagPoints.includes(p))
      .forEach(p => newQueue.add(p));

    // ここで state を更新するので再び MsField が実行される。キューが空になるまで再帰的に実行される
    setState({ ...state, openPoints: newOpenPoints });
    setQueue(newQueue);
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

    setState({ ...state, openPoints: newOpenPoints });
    setQueue(newOpenPointsQueue);
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

  const rows = sequence(height).map(y => (
    <div key={y} className="field-row">
      {sequence(width).map(x => createMsCell(x, y))}
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
 * @param width 横幅
 * @param height 高さ
 * @param state Fieldの状態
 * @returns Field
 */
function buildField(width: number, height: number, state: MsFieldState) {
  const result = new Field(width, height);

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
