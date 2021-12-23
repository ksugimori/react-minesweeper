import { Game } from "../Game";
import Point from "../util/Point";
import { AbstractStatus } from "./AbstractStatus";

/**
 * ゲーム終了状態（負け）
 */
export class LoseStatus extends AbstractStatus {
  constructor() {
    super('LOSE');
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
