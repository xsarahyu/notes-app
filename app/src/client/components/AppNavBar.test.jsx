
import React from 'react';
import { renderInContext } from "wasp/client/test";
import { screen } from "@testing-library/react";
import AppNavBar from './AppNavBar';

//Test for Rendering Navigation Links:
test('Testing NavBar When Always True', async () => {
  renderInContext(<AppNavBar />);
  // Test 2: see the text on the page  "Documentation" 
   const docText = await screen.findByText('Documentation'); 
   expect(docText).toBeInTheDocument();
});

//Testing on NavBar - ALWAYS TRUE -
  // TEST 1: toggle feature for light/dark mode

  // TEST 2: clicking Documentation 
  
//WHEN NOT LOGGED IN
  // TEST 3: When you are not logged in you want to see "Log in"
  // TEST 4: "Log in" is clickable
//check when the url path is "/demo-app" then ill run this test so it doesnt fail when on landing page 
      // TEST 5: that i see the text on the page "AI Scheduler (Demo App)"
      // TEST 6: clicking Ai Scheduler Note APP  
// these have to be renderContext for authentication through MockServer 
      // TEST 7: Test that I see the username: "test" by using mock server 
      // TEST 8: Click on dropdown 
      // TEST 9: Click on Logout
      // TEST 10: Click on Account Settings

  // expect(element).toBeDefined()
  // expect(getByText('Username')).toBeInTheDocument();