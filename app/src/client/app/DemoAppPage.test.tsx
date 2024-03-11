import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderInContext, mockServer } from "wasp/client/test";
import { getAllTasksByUser } from "wasp/client/operations";
import DemoAppPage from './DemoAppPage';

//Simulating a server 
const { mockQuery} = mockServer();

//Tests to focus on DemoAppPage:

  //Testing CRUD notes functionality where inside I am testing create note, update note, delete note
    //*LEFT TO DO: READ A LIST OF noteS */
describe('Testing Note CRUD', () => {


  // TEST 1: Confirm user sees text default "Remember to..." in text field, can add note, see newly created note
  test('Testing creating new note', async () => {

    //Creating Mocked note
    const mocknotes = [
      {
        id: "1",
        description: "test todo 1",
        createdAt: new Date(),
        time: "4:20",
        isDone: true,
        userId: 1,
      },
    ];
    
    renderInContext(<DemoAppPage />);

    //To ensure you see the text for new note 
    let input = screen.getByPlaceholderText('Remember to...');
    fireEvent.change(input, { target: { value: mocknotes[0].description } });
    input = screen.getByDisplayValue(mocknotes[0].description);
    expect(input).toBeInTheDocument();
    
    //Creating new note 
    const addButton = screen.getByText('Add Note');
    fireEvent.click(addButton);

    //This is simulating creating a server call when the note is created
    mockQuery(getAllTasksByUser, mocknotes);

    // Wait for asynchronous operations, then make assertions
    await waitFor(() => {
   
      //Confirming Mock note was added
      let newnote = screen.getByText(mocknotes[0].description)
      expect(newnote).toBeInTheDocument();

    });
  });


  // TEST 2: Test Checking note and Unchecking note
  test('Testing note checkbox feature', async () => {

    //Creating Mocked note
    const mocknotes = [
      {
        id: "1",
        description: "test todo 1",
        createdAt: new Date(),
        time: "4:20",
        isDone: false,
        userId: 1,
      },
    ];
    
    renderInContext(<DemoAppPage />);

    //Creating a fake server call to test 
    mockQuery(getAllTasksByUser, mocknotes);

     // Wait for asynchronous operations, then make assertions
    await waitFor(() => {

      // Assert that the checkbox is not checked
      expect(screen.getByRole("checkbox")).not.toBeChecked();
      const checkbox = screen.getByRole("checkbox");
      console.log(checkbox);

      //Clicking checkbox
      fireEvent.click(checkbox)
      
      // Wait for state to update. Check checkbox is checked
      waitFor(() => {
        expect(checkbox).toBeChecked();
      });
    });
  });
    
  
  //Test 3: Deleting note
  test('Testing deleting note', async () => {

    // Render the component
    renderInContext(<DemoAppPage />);

    // Create mock notes
    const mocknotes = [
      {
        id: "1",
        description: "Test todo 1",
        createdAt: new Date(),
        time: "4:20",
        isDone: false,
        userId: 1,
      }
    ];

    //Creating a fake server call to test 
    mockQuery(getAllTasksByUser, mocknotes);

    // Wait for note to appear in the UI
    await waitFor(() => {

      //Ensure note is created
      expect(screen.getByText('Test todo 1')).toBeInTheDocument();
      
      // Simulate the deletion action 
      const deleteButton = screen.getByTitle('Remove task')
      fireEvent.click(deleteButton);

      //Check that it was deleted 
      waitFor(() => {
        expect(screen.queryByText('Test todo 1')).not.toBeInTheDocument();
      });   
    });

  });
})

//TEST 4: Verifying default text displayed for DemoAppPage
test('Verify default text displayed', async () => {
  renderInContext(<DemoAppPage />);

  //Button text "Add Note" appears
  const addButton = screen.getByText('Add Note');
  expect(addButton).toBeInTheDocument();

  //Iput text default "Remember to.." appears
  let input = screen.getByPlaceholderText('Remember to...');
  expect(input).toBeInTheDocument();

})