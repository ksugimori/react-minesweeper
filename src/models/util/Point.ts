import Equalable from "./Equalable";

/**
 * 座標を表すクラス
 */
export default class Point implements Equalable<Point> {
  /** x 座標 */
  private _x: number;

  /** y 座標 */
  private _y: number;

  /**
   * コンストラクタ
   * @param x x座標
   * @param y y座標
   */
  constructor(x: number, y: number) {
    // 直接更新されたくないので x, y は Getter のみ公開
    this._x = x;
    this._y = y;
  }

  /**
   * ファクトリーメソッド。
   *
   * 現状はコンストラクタと同じです。
   * あくまでも読みやすさのためだけに使います。
   * @param x x座標
   * @param y y座標
   */
  static of(x: number, y: number) {
    return new Point(x, y);
  }

  /**
   * x座標
   */
  get x(): number {
    return this._x;
  }

  /**
   * y座標
   */
  get y(): number {
    return this._y;
  }

  /**
   * オブジェクトの同値比較。
   * @param other 比較対象のオブジェクト
   */
  equals(other: Point) {
    return this._x === other._x && this._y === other._y;
  }

  /**
   * x に n 加えた座標を得る
   * @param n 移動量
   */
  addX(n: number) {
    return Point.of(this._x + n, this._y);
  }

  /**
   * y に n 加えた座標を得る
   * @param n 移動量
   */
  addY(n: number) {
    return Point.of(this._x, this._y + n);
  }
}
