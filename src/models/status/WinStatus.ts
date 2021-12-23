import { Game } from "../Game";
import Point from "../util/Point";
import { AbstractStatus } from "./AbstractStatus";

/**
 * ゲーム終了状態（勝利）
 */
export class WinStatus extends AbstractStatus {
  constructor() {
    super('WIN');
  }

  /**
   * 終了状態か？
   */
  get isEnd() {
    return true;
  }

  /**
   * セルを開く。
   */
  open(game: Game, point: Point) {
    // 何もしない
  }

  /**
   * フラグを立てる。
   */
  flag(game: Game, point: Point) {
    // 何もしない
  }
}
