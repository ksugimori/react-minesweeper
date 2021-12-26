import React, { useState } from 'react';
import './MsCell.scss';

/**
 * props
 */
type Props = {
  count: number,
}

/**
 * セル
 * @param props 
 * @returns セル
 */
export default function MsCell({ count }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const classNameList = ['cell']
  isOpen && classNameList.push('cell-open')

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div
      className={classNameList.join(' ')}
      onClick={toggleIsOpen}
    >
      {isOpen && count > 0 ? count : ''}
    </div>
  );
}
