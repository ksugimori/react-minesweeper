/**
 * 時間計測用のクラス
 */
export class StopWatch {
  /** プレイ時間 */
  public playTime: number;

  /** 開始日時（unixtime） */
  public startTime?: number;

  /** カウントアップのタイマー */
  private timer?: number;

  /**
   * コンストラクタ
   */
  constructor() {
    this.playTime = 0;
    this.startTime = undefined;
    this.timer = undefined;
  }

  /**
   * 計測を開始する。
   *
   * １秒ごとに playTime の値を更新します。
   */
  start() {
    this.startTime = Date.now();
    this.timer = window.setInterval(() => {
      const msec = this.startTime ? Date.now() - this.startTime : 0;
      this.playTime = Math.floor(msec / 1000);
    }, 1000);
  }

  /**
   * 計測を停止する。
   *
   * このメソッドでは playTime はリセットされません。
   */
  stop() {
    clearInterval(this.timer);
  }

  /**
   * 初期状態に戻す
   */
  reset() {
    this.stop();
    this.playTime = 0;
    this.startTime = undefined;
  }
}
