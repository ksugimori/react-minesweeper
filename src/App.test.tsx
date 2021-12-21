import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('タイトルが描画されること', () => {
  render(<App />);
  const h1 = screen.getByText(/React minesweeper/)
  expect(h1).toBeInTheDocument();
});
