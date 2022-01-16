import Cell from "./Cell";
import Point from "./Point";

/**
 * 盤面の状態を表すクラス。
 */
export default class Field {
  /** 盤の横幅 */
  public width: number;

  /** 盤の高さ */
  public height: number;

  /** 全てのセル。 */
  public cells: Cell[][] = [];

  /**
   * コンストラクタ。
   * 
   * 全セルが初期状態で作成されます。
   * @param width 横幅
   * @param height 高さ
   */
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    for (let y = 0; y < height; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < width; x++) {
        row[x] = {
          count: 0,
          isMine: false,
          isOpen: false,
          isFlag: false
        };
      }

      this.cells[y] = row;
    }
  }

  /**
   * 指定した座標のセルを取得する。
   * @param p 座標
   * @returns セル
   */
  public at(p: Point): Cell {
    return this.cells[p.y][p.x]
  }

  /**
   * 周囲の座標を取得する。
   * 
   * 戻り値に盤外の座標は含まれません。
   * @param p 座標
   * @returns 周囲の座標
   */
  public arroundPoints(p: Point): Point[] {
    const result: Point[] = [];

    const addIfInside = (tmp: Point) => {
      this.isInside(tmp) && result.push(tmp);
    }

    addIfInside({ x: p.x - 1, y: p.y - 1 });
    addIfInside({ x: p.x - 1, y: p.y });
    addIfInside({ x: p.x - 1, y: p.y + 1 });

    addIfInside({ x: p.x, y: p.y - 1 });
    addIfInside({ x: p.x, y: p.y + 1 });

    addIfInside({ x: p.x + 1, y: p.y - 1 });
    addIfInside({ x: p.x + 1, y: p.y });
    addIfInside({ x: p.x + 1, y: p.y + 1 });

    return result;
  }

  /**
   * 周囲のセルを取得する。
   * 
   * 戻り値に盤外の座標のセルは含まれません。
   * @param p 座標
   * @returns 周囲のセル
   */
  public arround(p: Point): Cell[] {
    return this.arroundPoints(p).map(tmp => this.at(tmp));
  }

  /**
   * 盤上の座標か？
   * @param p 座標
   * @returns 盤上に含まれる場合は true
   */
  private isInside(p: Point): boolean {
    return p.x >= 0 && p.x < this.width
      && p.y >= 0 && p.y < this.height
  }
}