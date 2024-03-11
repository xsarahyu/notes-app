// DarkModeSwitcher.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DarkModeSwitcher from './DarkModeSwitcher';

// Mock useColorMode hook to control its behavior in tests
jest.mock('../../hooks/useColorMode', () => () => {
  const [colorMode, setColorMode] = React.useState('light');
  return [colorMode, setColorMode];
});

test('DarkModeSwitcher toggles color mode correctly', () => {
  const { container } = render(<DarkModeSwitcher />);
  const switcher = container.querySelector('label');

  // Initial state: light mode
  expect(switcher).toHaveClass('bg-stroke');

  // Click on the switcher to toggle mode
  fireEvent.click(switcher);

  // Expect it to have 'bg-primary' class after clicking
  expect(switcher).toHaveClass('bg-primary');

  // Click again to revert back
  fireEvent.click(switcher);

  // Expect it to have 'bg-stroke' class after clicking again
  expect(switcher).toHaveClass('bg-stroke');
});
