import Point from "./Point";

export default interface Cell {
  at: Point;

  count: number;

  isOpen: boolean;

  isMine: boolean;

  isFlag: boolean;
}