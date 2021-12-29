import Cell from "./Cell";
import Point from "./Point";

export default class Field {
  public width: number;
  public height: number;
  public cells: Cell[][] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    for (let y = 0; y < height; y++) {
      const row: Cell[] = [];
      for (let x = 0; x < width; x++) {
        row[x] = {
          at: { x, y },
          count: 0,
          isMine: false,
          isOpen: false,
          isFlag: false
        };
      }

      this.cells[y] = row;
    }
  }

  public at(p: Point): Cell {
    return this.cells[p.y][p.x]
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

  public arround(p: Point): Cell[] {
    const result: Cell[] = [];

    const addIfInside = (tmp: Point) => {
      this.isInside(tmp) && result.push(this.at(tmp));
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
}