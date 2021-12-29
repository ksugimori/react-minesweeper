import React from 'react';
import Cell from '../models/Cell';
import './MsCell.scss';

/**
 * props
 */
interface Props extends Cell {
  /** クリック時のハンドラ */
  onClick: () => void;
}

/**
 * セル
 * @param props 
 * @returns セル
 */
export default function MsCell({ count, isOpen, isMine, onClick }: Props) {
  const classNameList = ['cell']
  isOpen && classNameList.push('cell-open')

  return (
    <div
      className={classNameList.join(' ')}
      onClick={onClick}
    >
      {text(isOpen, isMine, count)}
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
function text(isOpen: boolean, isMine: boolean, count: number) {
  if (!isOpen) {
    return '';
  }

  if (isMine) {
    return 'M'
  }

  return count > 0 ? count.toString() : ''
}