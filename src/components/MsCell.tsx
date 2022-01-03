import React from 'react';
import Cell from '../models/Cell';
import './MsCell.scss';

/**
 * props
 */
interface Props extends Cell {
  /** 左クリック時のハンドラ */
  onLeftClick: () => void;

  /** 右クリック時のハンドラ */
  onRightClick: () => void;
}

/**
 * セル
 * @param props 
 * @returns セル
 */
export default function MsCell({ count, isOpen, isMine, isFlag, onLeftClick, onRightClick }: Props) {
  const classNameList = ['cell']
  isOpen && classNameList.push('cell-open')
  isFlag && classNameList.push('cell-flag')

  return (
    <div
      className={classNameList.join(' ')}
      onClick={onLeftClick}
      onContextMenu={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        onRightClick();
      }}
    >
      {text(isOpen, isMine, count, isFlag)}
    </div>
  );
}

// ------------------------------------------------------------
// module private
// ------------------------------------------------------------

/**
 * 表示するテキストを組み立てる。
 * @param isOpen 開いているか？
 * @param isMine 地雷が埋まっているか？
 * @param count 周囲の地雷数
 * @returns テキスト
 */
function text(isOpen: boolean, isMine: boolean, count: number, isFlag: boolean) {
  if (!isOpen) {
    return isFlag ? 'F' : '';
  }

  if (isMine) {
    return 'M'
  }

  return count > 0 ? count.toString() : '';
}