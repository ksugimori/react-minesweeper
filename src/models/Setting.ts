export class Setting {
  static EASY = new Setting(9, 9, 10);
  static NORMAL = new Setting(16, 16, 40);
  static HARD = new Setting(30, 16, 99);

  /** 盤面の横幅 */
  public width: number;

  /** 盤面の高さ */
  public height: number;

  /** 地雷数 */
  public numMines: number;

  /**
   * コンストラクタ
   * @param width 幅
   * @param height 高さ
   * @param numMines 地雷数
   */
  constructor(width: number, height: number, numMines: number) {
    this.width = width;
    this.height = height;
    this.numMines = numMines;
  }

  /**
   * 名前。
   *
   * プリセットの難易度の場合はその名前、それ以外の場合は CUSTOM が返ります。
   */
  get name() {
    if (this.equals(Setting.EASY)) {
      return 'EASY';
    }
    if (this.equals(Setting.NORMAL)) {
      return 'NORMAL';
    }
    if (this.equals(Setting.HARD)) {
      return 'HARD';
    }

    return 'CUSTOM';
  }

  /**
   * 同値であるか判定する。
   * @param other 比較するオブジェクト
   */
  equals(other: Setting) {
    if (!other) return false;

    return this.height === other.height &&
      this.width === other.width &&
      this.numMines === other.numMines;
  }

  /**
   * オブジェクトをコピーする。
   */
  clone() {
    let result = new Setting(Setting.EASY.width, Setting.EASY.height, Setting.EASY.numMines);

    result.merge(this);

    return result;
  }

  /**
   * 他のオブジェクトをマージする。
   * @param other
   */
  merge(other: { width: number, height: number, numMines: number }) {
    this.width = other.width;
    this.height = other.height;
    this.numMines = other.numMines;
  }

  /**
   * 設定値を調節する。
   *
   * 地雷数が盤面のセル数より多い場合、セル数 - 1 を地雷数にします
   */
  adjustNumMines() {
    let total = this.width * this.height;
    if (total <= this.numMines) {
      this.numMines = Math.max(0, total - 1);
    }
  }
}
