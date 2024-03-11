import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderInContext, mockServer } from "wasp/client/test";
import { getAllTasksByUser } from "wasp/client/operations";
import DemoAppPage from './DemoAppPage';

const { mockQuery} = mockServer();

//Tests to focus on DemoAppPage:

// TEST 3: Clicking on checkbox for notes mockServer
// TEST 4: Clicking on x to delete notes mockServer


  // TEST 1: Adding a Note 
  // TEST 2: See newly added note
  // TEST 5: See text default "Remember to..."  
  test('handles creating a new task', async () => {

    const mockTasks = [
      {
        id: 1,
        description: "test todo 1",
        isDone: true,
        userId: 1,
      },
    ];
    
    renderInContext(<DemoAppPage />);

    //to ensure you see the text for new task 
    let input = screen.getByPlaceholderText('Remember to...');
    fireEvent.change(input, { target: { value: mockTasks[0].description } });
    input = screen.getByDisplayValue(mockTasks[0].description);
    expect(input).toBeInTheDocument();
    
    //Creating new task 
    const addButton = screen.getByText('Add Note');
    fireEvent.click(addButton);

    mockQuery(getAllTasksByUser, mockTasks);

    // Wait for asynchronous operations, then make assertions
    await waitFor(() => {
      // Add your assertions here
      let newTask = screen.getByText(mockTasks[0].description)
      console.log(newTask)
      expect(newTask).toBeInTheDocument();
    });
  });



  // test('Ensure default title "Notes App" is displayed', () => {
  //   // renderInContext(<DemoAppPage />);
  //   const titleElement = getByTextContent('Notes App');
  //   expect(titleElement).toBeInTheDocument();
  //   // console.log("test")
  //   // console.log(screen.getByText((_, element) => element.textContent == 'Notes App'))
  //   // expect(screen.getByText((_, element) => element.textContent === 'Notes App')).toBeInTheDocument();

  //   // renderInContext(<DemoAppPage data-testid="component" />)
  //   // expect(screen.getByTestId('component').textContent).toBe('Notes App')
  // });


  test('Verify default text displayed', async () => {
    renderInContext(<DemoAppPage />);

    //to ensure you see text "Add Note" 
    const addButton = screen.getByText('Add Note');
    expect(addButton).toBeInTheDocument();

    //to ensure you see the text default "Remember to.."
    let input = screen.getByPlaceholderText('Remember to...');
    expect(input).toBeInTheDocument();

    //to ensure you see the text default title "Notes App"
    // let title = screen.getByText('Notes App');
    // expect(title).toBeInTheDocument();
  })

  


  test('handles updating a task', async () => {
    renderInContext(<DemoAppPage />);
  });

  test('handles deleting a task', async () => {
    // Similar structure as the 'handles creating a new task' test
  });
// });
