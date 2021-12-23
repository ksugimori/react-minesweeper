import { Game } from '../Game';
import Point from '../util/Point';
import { AbstractStatus } from './AbstractStatus';
import { Status } from './Status';

/**
 * プレイ中の状態
 */
export class PlayStatus extends AbstractStatus {
  constructor() {
    super('PLAY');
  }

  /**
   * 終了状態か？
   */
  get isEnd() {
    return false;
  }

  /**
   * セルを開く。
   * @param game ゲーム
   * @param point 座標
   */
  open(game: Game, point: Point) {
    game.doOpen(point);

    // 終了判定
    if (game.isWin()) {
      game.timerStop();
      game.status = Status.WIN;
    } else if (game.isLose()) {
      game.timerStop();
      game.status = Status.LOSE;
    }
  }

  /**
   * フラグを立てる。
   * @param game ゲーム
   * @param point 座標
   */
  flag(game: Game, point: Point) {
    game.doFlag(point);
  }
}
