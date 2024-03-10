import React from 'react';
import { render, screen } from '@testing-library/react';
import authWrapper from './authWrapper';

//Test for Rendering Navigation Links:
test('my testing test', () => {
  render(<authWrapper />);
  const linkElements = screen.getAllByRole('link');
  console.log(linkElements);
  expect(linkElements.length).toBeGreaterThan(0);
  //  const element = screen.getByText('Don\'t have an account yet?') || screen.getByText('I already have an account') 
  // expect(element).toBeDefined()
  // expect(getByText('Username')).toBeInTheDocument();
});

