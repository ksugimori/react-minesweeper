import Point from "./Point";

/**
 * Point のコレクションを表すクラス
 */
export default class PointSet {
  /** 内部で保持する Point の配列 */
  private values: Point[] = [];

  /** Point の数 */
  public get size(): number {
    return this.values.length;
  }

  /**
   * Point を追加する。
   * 
   * 重複するものは追加されません。
   * @param p 座標
   */
  public add(p: Point) {
    if (this.includes(p)) {
      return;
    }
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

  /**
   * オブジェクトのクローンを作成する。
   * @returns 内容がコピーされたオブジェクト
   */
  public clone() {
    const result = new PointSet();
    result.values = this.values.slice()
    return result;
  }

  /**
   * 周囲の Point を数える
   * @param p 座標
   * @returns Point の数
   */
  public countNeighbors(p: { x: number; y: number; }): number {
    const above = this.values.filter(e => e.y === p.y - 1).filter(e => e.x >= p.x - 1 && e.x <= p.x + 1).length;
    const same = this.values.filter(e => e.y === p.y).filter(e => e.x === p.x - 1 || e.x === p.x + 1).length;
    const below = this.values.filter(e => e.y === p.y + 1).filter(e => e.x >= p.x - 1 && e.x <= p.x + 1).length;
    return above + same + below;
  }

  /**
   * 配列に変換する。
   * @returns Point の配列
   */
  public toArray(): Point[] {
    return this.values.slice();
  }
}