import React from 'react';
import { renderInContext } from "wasp/client/test";
import { screen } from "@testing-library/react";
import AppNavBar from './AppNavBar';

//Test for Rendering Navigation Links:
test('Testing NavBar Content', async () => {
  renderInContext(<AppNavBar />);

   // Test 2: see the text on the page  "Documentation" 
   const docNavBarItem = await screen.findByText('Documentation'); 

   // Checked if it found an object/HTML Element whose text says 'Documentation '
   expect(docNavBarItem).toBeInTheDocument();
});