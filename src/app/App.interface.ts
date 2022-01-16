import Point from "../models/Point";

/**
 * 基本設定
 */
export type Setting = {
  /** 盤の横幅（セル数） */
  width: number;

  /** 盤の高さ（セル数） */
  height: number;
};

/**
 * ゲームの状態
 */
export interface GameState {
  /** 設定 */
  setting: Setting;

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