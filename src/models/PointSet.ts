import Point from "./Point";

/**
 * Point のコレクションを表すクラス
 */
export default class PointSet {
  /** 内部で保持する Point の配列 */
  private values: Point[] = [];

  /**
   * Point を追加する
   * @param p 座標
   */
  public add(p: Point) {
    this.values.push(p);
  }

  /**
   * 引数に渡された座標が存在するか？
   * @param p 座標
   * @returns 含まれていれば true
   */
  public includes(p: Point) {
    return this.values.filter(e => e.x === p.x).some(e => e.y === p.y)
  }
}