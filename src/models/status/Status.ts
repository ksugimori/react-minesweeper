import { InitialStatus } from './InitialStatus';
import { PlayStatus } from './PlayStatus';
import { WinStatus } from './WinStatus';
import { LoseStatus } from './LoseStatus';

export class Status {
  static INIT = new InitialStatus()
  static PLAY = new PlayStatus()
  static WIN = new WinStatus()
  static LOSE = new LoseStatus()
}
