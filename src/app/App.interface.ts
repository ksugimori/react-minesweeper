import Point from "../models/Point";

/**
 * ゲームの状態
 */
export interface GameState {
  /** 地雷の埋まっているセルの座標 */
  minePoints: Point[];

  /** フラグの立てられているセルの座標 */
  flagPoints: Point[];

  /** 開かれているセルの座標 */
  openPoints: Point[];
}

/**
 * Redux で管理するアプリケーション全体のステート
 */
export interface MsRootState {
  game: GameState;
}