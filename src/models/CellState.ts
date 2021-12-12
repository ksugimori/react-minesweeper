/**
 * セルの状態
 */
export default interface CellState {
  /** 周囲の地雷数 */
  count: number;

  /** 開いているか？ */
  isOpen: boolean;
}