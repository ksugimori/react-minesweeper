import Cell from './Cell';
import Point from './util/Point';

/**
 * 盤面
 *
 * このクラスには幾何学的な情報、操作のみを持ち、ゲームに関する知識は極力持たないようにする。
 */
export default class Field {
  /** 横幅 */
  public width: number;

  /** 高さ */
  public height: number;

  /** 行ごとのセル */
  public rows: Cell[][];

  /**
   * コンストラクタ
   * @param width 幅
   * @param height 高さ
   */
  constructor()
  constructor(width: number, height: number)
  constructor(width?: number, height?: number) {
    this.width = width || 0;
    this.height = height || 0;
    this.rows = [];

    for (let y = 0; y < this.height; y++) {
      let row: Cell[] = [];
      for (let x = 0; x < this.width; x++) {
        row.push(new Cell());
      }
      this.rows.push(row);
    }
  }

  /**
   * 指定した座標のセルを取得する
   * @param point
   */
  cellAt(point: Point): Cell | undefined {
    if (contains(this, point)) {
      return this.rows[point.y][point.x];
    } else {
      return undefined;
    }
  }

  /**
   * 範囲内の座標すべてを配列として取得する
   * @param filterFunc Cell を引数にとるフィルタリング関数
   */
  points(filterFunc?: (c: Cell) => boolean) {
    let result = [];
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        result.push(Point.of(x, y));
      }
    }

    return filterByCell(this, result, filterFunc);
  }

  /**
   * 周囲の座標を配列にして取得する。
   * @param center 座標
   * @param filterFunc Cell を引数にとるフィルタリング関数
   */
  pointsArround(center: Point, filterFunc?: (c: Cell) => boolean) {
    let points = [
      // ひとつ上の行
      center.addY(-1).addX(-1),
      center.addY(-1),
      center.addY(-1).addX(1),
      // 同じ行
      center.addX(-1),
      center.addX(1),
      // ひとつ下の行
      center.addY(1).addX(-1),
      center.addY(1),
      center.addY(1).addX(1)
    ].filter(p => contains(this, p));

    return filterByCell(this, points, filterFunc);
  }
}

// -----------------------------------------------------
// private
// -----------------------------------------------------

/**
 * フィールド内の座標か？
 * @param field フィールド
 * @param p 座標
 */
function contains(field: Field, p: Point) {
  return (p.x >= 0 && p.x < field.width) && (p.y >= 0 && p.y < field.height);
}

/**
 * 配列をセルに対する条件でフィルタリングする
 * @param field フィールド
 * @param points Point の配列
 * @param filterFunc Cell を引数にとるフィルタリング関数
 */
function filterByCell(field: Field, points: Point[], filterFunc?: (c: Cell) => boolean) {
  if (filterFunc) {
    return points.filter(p => {
      const cell = field.cellAt(p);
      return (!cell) ? false : filterFunc(cell);
    });
  } else {
    return points;
  }
}
