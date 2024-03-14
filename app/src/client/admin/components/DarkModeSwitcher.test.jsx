import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DarkModeSwitcher from './DarkModeSwitcher';

test('DarkModeSwitcher toggles color mode correctly', () => {
  const { container } = render(<DarkModeSwitcher />);
  const switcher = container.querySelector('label');

  // Initial state: light mode
  expect(switcher).toHaveClass('bg-stroke');

  fireEvent.click(switcher);

  // Expect it to have 'bg-primary' class after clicking
  expect(switcher).toHaveClass('bg-primary');

  fireEvent.click(switcher);

  // Expect it to have 'bg-stroke' class after clicking again
  expect(switcher).toHaveClass('bg-stroke');
});
