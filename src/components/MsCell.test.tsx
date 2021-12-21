import React from "react";
import { render } from "@testing-library/react";
import MsCell from './MsCell';

describe('MsCell', () => {
  test('isOpen=true のとき count が描画されること', () => {
    const cell = {
      id: '0:0',
      at: { x: 0, y: 0 },
      count: 8,
      isOpen: true
    };

    const { container } = render(<MsCell {...cell} />)

    expect(container.firstChild).toHaveClass('cell')
    expect(container.firstChild).toHaveTextContent('8')
  })

  test('isOpen=false のとき count が描画されないこと', () => {
    const cell = {
      id: '0:0',
      at: { x: 0, y: 0 },
      count: 8,
      isOpen: false
    };

    const { container } = render(<MsCell {...cell} />)

    expect(container.firstChild).toHaveClass('cell')
    expect(container.firstChild).not.toHaveTextContent('8')
  })
})
