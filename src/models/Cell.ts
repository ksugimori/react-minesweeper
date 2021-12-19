import Point from "./Point";

/**
 * セルの状態
 */
export default class Cell {
  /** セルを一意に識別するID */
  id: string;

  /** 座標 */
  at: Point;

  /** 周囲の地雷数 */
  count: number;

  /** 開いているか？ */
  isOpen: boolean;

  constructor(at: Point) {
    this.id = `${at.x}:${at.y}`
    this.at = at;
    this.count = 0;
    this.isOpen = false;
  }
}