import Equalable from './Equalable';

/**
 * 重複要素の存在しないキュー
 *
 * 同値判定には要素の equals メソッドを使います。
 */
export class UniqueQueue<T extends Equalable<T>> {
  private elements: T[];

  constructor() {
    this.elements = [];
  }

  /**
   * Point を追加する。
   *
   * 同じ値の要素がキューに存在する場合は追加されません。
   * @param element 追加する要素
   */
  push(element: T) {
    if (this.elements.some(x => x.equals(element))) {
      return;
    }

    this.elements.push(element);
  }

  /**
   * Point を取り出す
   */
  shift(): T | undefined {
    return this.elements.shift();
  }
}
