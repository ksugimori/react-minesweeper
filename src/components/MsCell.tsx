import React from 'react';
import './MsCell.scss';

/**
 * props
 */
interface Props {
  count: number;
  isOpen: boolean;
  onClick: () => void;
}

/**
 * セル
 * @param props 
 * @returns セル
 */
export default function MsCell({ count, isOpen, onClick }: Props) {
  const classNameList = ['cell']
  isOpen && classNameList.push('cell-open')

  return (
    <div
      className={classNameList.join(' ')}
      onClick={onClick}
    >
      {isOpen && count > 0 ? count : ''}
    </div>
  );
}
