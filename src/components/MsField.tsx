import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GameState } from '../app/App.interface';
import Field from '../models/Field';
import Point from '../models/Point';
import MsCell from "./MsCell";
import {
  selectMinePoints,
  selectFlagPoints,
  selectOpenPoints,
  setOpenPoints,
  setFlagPoints
} from '../features/game/gameSlice';
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
 * ゲームの盤面を表すコンポーネント。
 * @returns Field
 */
export default function MsField({ width, height }: Props) {

  const dispatch = useDispatch();

  const minePoints = useSelector(selectMinePoints);
  const flagPoints = useSelector(selectFlagPoints);
  const openPoints = useSelector(selectOpenPoints);

  // 開く必要のあるセルの座標。次回描画時に値が入っていればそれらを開く
  const [queue, setQueue] = useState<Point[]>([]);

  const field = buildField(width, height, { minePoints, flagPoints, openPoints });

  // キューに値が入っている場合はそれらを開く
  useEffect(() => {
    if (queue.length <= 0) {
      return
    }

    const newOpenPoints = openPoints.slice();
    const newQueue: Point[] = [];

    // キューに入っている座標のセルを開く
    queue.filter(p => !includes(p, newOpenPoints))
      .forEach(p => newOpenPoints.push(p));

    // 開いたセルがまた空白セルなら、周囲の座標を新たにキューに入れる
    queue.filter(p => field.at(p).count === 0)
      .flatMap(p => field.arround(p).map(cell => cell.at))
      .filter(p => !includes(p, newOpenPoints))
      .filter(p => !includes(p, flagPoints))
      .filter(p => includes(p, newQueue) || newQueue.push(p));

    // ここで state を更新するので再び MsField が実行される。キューが空になるまで再帰的に実行される
    const timer = setTimeout(() => {
      dispatch(setOpenPoints(newOpenPoints));
      setQueue(newQueue);
    }, 60)

    return () => clearTimeout(timer)
  });

  const onClickCell = (clickedPoint: Point) => {
    const cell = field.at(clickedPoint);
    const newOpenPoints = openPoints.slice();
    const newOpenPointsQueue: Point[] = [];

    if (cell.isFlag) {
      return;
    }

    // すでに開かれてるセルの場合、
    if (cell.isOpen && cell.count > 0) {
      // count と同じ数のフラグが立てられていれば、それ以外のセルは開く
      if (cell.count === field.arround(clickedPoint).filter(cell => cell.isFlag).length) {
        field.arround(clickedPoint).map(cell => cell.at)
          .filter(p => !includes(p, newOpenPoints))
          .filter(p => !includes(p, flagPoints))
          .forEach(p => newOpenPoints.push(p));

        dispatch(setOpenPoints(newOpenPoints));

        return;
      }
    }

    if (!includes(clickedPoint, newOpenPoints)) {
      newOpenPoints.push(clickedPoint);
    }

    if (cell.count === 0) {
      field.arround(clickedPoint).map(cell => cell.at)
        .filter(p => !includes(p, newOpenPoints))
        .filter(p => !includes(p, flagPoints))
        .forEach(p => includes(p, newOpenPointsQueue) || newOpenPointsQueue.push(p))
    }

    dispatch(setOpenPoints(newOpenPoints));
    setQueue(newOpenPointsQueue);
  }

  const onRightClickCell = (p: Point) => {
    if (field.at(p).isOpen) return;

    let newFlagPoints: Point[];
    if (includes(p, flagPoints)) {
      newFlagPoints = flagPoints.filter(e => e.x !== p.x && e.y !== p.y)
    } else {
      newFlagPoints = [...flagPoints, p];
    }

    dispatch(setFlagPoints(newFlagPoints))
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
function buildField(width: number, height: number, state: GameState) {
  const result = new Field(width, height);

  state.minePoints.forEach(p => {
    result.at(p).isMine = true;
    result.arround(p).forEach(cell => cell.count++);
  });
  state.openPoints.forEach(p => result.at(p).isOpen = true);
  state.flagPoints
    .filter(p => !includes(p, state.openPoints))
    .forEach(p => result.at(p).isFlag = true);

  return result;
}

/**
 * 配列内に座標が存在するか？
 * @param needle 検索する座標
 * @param haystack 検索対象の配列
 * @returns 含まれていれば true
 */
function includes(needle: Point, haystack: Point[]): boolean {
  return haystack.filter(p => p.x === needle.x).some(p => p.y === needle.y);
}
