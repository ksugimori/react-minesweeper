import { Game } from '../Game';
import Point from '../util/Point';
import { AbstractStatus } from './AbstractStatus';
import { Status } from './Status';

/**
 * 初期状態
 */
export class InitialStatus extends AbstractStatus {
  constructor() {
    super('INIT');
  }

  /**
   * 終了状態か？
   */
  get isEnd() {
    return false;
  }

  /**
   * セルを開く。
   *
   * 初期状態では地雷のセットを行ったあとにセルを開く
   * @param game ゲーム
   * @param point 座標
   */
  open(game: Game, point: Point) {
    // 開始準備
    game.mine(point);
    game.timerStart();
    game.status = Status.PLAY;

    // セルを開く
    game.doOpen(point);

    // 終了判定
    if (game.isWin()) {
      game.timerStop();
      game.status = Status.WIN;
    }
  }

  /**
   * フラグを立てる。
   */
  flag(game: Game, point: Point) {
    // 何もしない
  }
}
