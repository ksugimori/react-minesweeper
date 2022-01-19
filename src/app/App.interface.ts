import Point from "../models/Point";

export type Status = 'INIT' | 'PLAY' | 'WIN' | 'LOSE'

/**
 * 基本設定
 */
export type Setting = {
  /** 盤の横幅（セル数） */
  width: number;

  /** 盤の高さ（セル数） */
  height: number;

  /** 地雷数 */
  numMines: number;
};

/**
 * ゲームの状態
 */
export interface GameState {
  /** ステータス */
  status: Status;

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