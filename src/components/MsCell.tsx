import React from 'react';
import './MsCell.scss';

/**
 * props
 */
type Props = {
  isOpen: boolean,
  count: number,
}

/**
 * セル
 * @param props 
 * @returns セル
 */
export default function MsCell({ isOpen, count }: Props) {
  const classNameList = ['cell']
  isOpen && classNameList.push('cell-open')

  return (
    <div
      className={classNameList.join(' ')}
    >
      {isOpen && count > 0 ? count : ''}
    </div>
  );
}
