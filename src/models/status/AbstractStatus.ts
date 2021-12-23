import { Game } from "../Game";
import Point from "../util/Point";

/**
 * ゲームの状態
 */
export abstract class AbstractStatus {
  /** 名称 */
  public name: string;

  /**
   * コンストラクタ
   * @param name 名称
   */
  constructor(name: string) {
    this.name = name;
  }

  /**
   * 終了状態か？
   */
  abstract get isEnd(): boolean

  /**
   * 指定した座標のセルを開く。
   * @param game ゲーム
   * @param point 座標
   */
  abstract open(game: Game, point: Point): void

  /**
   * 指定した座標のセルにフラグを立てる。
   * @param game ゲーム
   * @param point 座標
   */
  abstract flag(game: Game, point: Point): void
}
