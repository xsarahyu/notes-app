import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderInContext } from "wasp/client/test";
import DemoAppPage from './DemoAppPage';

//Tests to focus on DemoAppPage:

  // TEST 3: Clicking on checkbox for notes mockServer
  // TEST 4: Clicking on x to delete notes mockServer

  // TEST 6: See text for title "Notes App"
  // TEST 7: 


// describe('DemoAppPage', () => {
//   test('renders correctly', () => {
//     renderInContext(<DemoAppPage />);
//     // Add your assertions here
//   });


  // TEST 1: Adding a Note 
  // TEST 2: See newly added note
  // TEST 5: See text default "Remember to..."  
  test('handles creating a new task', async () => {
    renderInContext(<DemoAppPage />);

    //to ensure you see the text default
    let input = screen.getByPlaceholderText('Remember to...');
    expect(input).toBeInTheDocument();

    //to ensure i see the text for new task 
    fireEvent.change(input, { target: { value: 'Test task' } });
    input = screen.getByDisplayValue('Test task');
    expect(input).toBeInTheDocument();

    //to ensure you see "Add Note" text on bttn
    const addButton = screen.getByText('Add Note');
    expect(addButton).toBeInTheDocument();

    //Creating new task and still see the default text on bttn
    fireEvent.click(addButton);


    // Wait for asynchronous operations, then make assertions
    await waitFor(() => {
      // Add your assertions here
      
    });
  });

  test('handles updating a task', async () => {
    // Similar structure as the 'handles creating a new task' test
  });

  test('handles deleting a task', async () => {
    // Similar structure as the 'handles creating a new task' test
  });
// });
