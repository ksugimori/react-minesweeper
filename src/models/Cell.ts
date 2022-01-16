import Point from "./Point";

/**
 * セルの状態
 */
export default interface Cell {
  /** 周囲の地雷数 */
  count: number;

  /** 開いているか？ */
  isOpen: boolean;

  /** 地雷が埋まっているか？ */
  isMine: boolean;

  /** フラグが立っているか？ */
  isFlag: boolean;
}