import { Setting } from '../Setting';
import Point from './Point';

/**
 * ランダムな Point の配列を生成する。
 *
 * x座標は 0 から setting.width まで（width は含まない）、
 * y座標は 0 から setting.height まで（height は含まない）、
 * の範囲からランダムに選択します。
 * @param setting 設定情報
 * @param excludePoint 除外する座標
 */
function points(setting: Setting, excludePoint: Point) {
  let excludeIndex = toIndex(excludePoint, setting.width);
  return randomInts(setting.width * setting.height)
    .filter(i => i !== excludeIndex)
    .slice(0, setting.numMines)
    .map(i => toPoint(i, setting.width));
}

/**
 * 0 から length - 1 までの数字をランダムに並べ替えた配列を生成する。
 * @param length 長さ
 */
function randomInts(length: number) {
  let result = new Array(length);
  for (let i = 0; i < length; i++) {
    result[i] = i;
  }

  shuffle(result);

  return result;
}

/**
 * Point から インデックス に変換する
 * @param point 座標
 * @param width 横幅
 */
function toIndex(point: Point, width: number) {
  return point.y * width + point.x;
}

/**
 * インデックスから Point に変換する
 * @param index インデックス
 * @param width 横幅
 */
function toPoint(index: number, width: number) {
  let x = index % width;
  let y = Math.floor(index / width);
  return Point.of(x, y);
}

/**
 * 配列をランダムに並べ替える
 * @param array 配列
 */
function shuffle(array: any[]): void {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * array.length);
    let tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  }
}

const random = { points };

export default random;
