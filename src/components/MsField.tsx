import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Field from '../models/Field';
import Point from '../models/Point';
import MsCell from "./MsCell";
import {
  selectStatus,
  selectSetting,
  selectMinePoints,
  selectFlagPoints,
  selectOpenPoints,
  setOpenPoints,
  setFlagPoints
} from '../features/game/gameSlice';
import "./MsField.scss";
import { Setting } from '../app/App.interface';

/**
 * ゲームの盤面を表すコンポーネント。
 * @returns Field
 */
export default function MsField() {

  const dispatch = useDispatch();

  const status = useSelector(selectStatus);
  const setting = useSelector(selectSetting);
  const minePoints = useSelector(selectMinePoints);
  const flagPoints = useSelector(selectFlagPoints);
  const openPoints = useSelector(selectOpenPoints);

  // 開く必要のあるセルの座標。次回描画時に値が入っていればそれらを開く
  const [queue, setQueue] = useState<Point[]>([]);

  const field = buildField(setting, minePoints, flagPoints, openPoints);
  if (status === 'WIN' || status === 'LOSE') {
    field.cells.flat().forEach(cell => cell.isOpen = true);
  }

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
      .flatMap(p => field.arroundPoints(p))
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
        field.arroundPoints(clickedPoint)
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
      field.arroundPoints(clickedPoint)
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

  const rows = sequence(setting.height).map(y => (
    <div key={y} className="field-row">
      {sequence(setting.width).map(x => createMsCell(x, y))}
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
function buildField(setting: Setting,
  minePoints: Point[], flagPoints: Point[], openPoints: Point[]) {

  const result = new Field(setting.width, setting.height);

  minePoints.forEach(p => {
    result.at(p).isMine = true;
    result.arround(p).forEach(cell => cell.count++);
  });
  openPoints.forEach(p => result.at(p).isOpen = true);
  flagPoints
    .filter(p => !includes(p, openPoints))
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
