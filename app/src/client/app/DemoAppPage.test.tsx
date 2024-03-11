import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderInContext, mockServer } from "wasp/client/test";
import { getAllTasksByUser } from "wasp/client/operations";
import DemoAppPage from './DemoAppPage';

//Simulating a server 
const { mockQuery} = mockServer();

//Tests to focus on DemoAppPage:

  //Testing CRUD tasks functionality where inside I am testing create task, update task, delete task
    //*LEFT TO DO: READ A LIST OF TASKS */
describe('Testing Task CRUD', () => {


  // TEST 1: Confirm user sees text default "Remember to..." in text field, can add task, see newly created task
  test('handles creating a new task', async () => {

    //Creating Mocked Task
    const mockTasks = [
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

    //To ensure you see the text for new task 
    let input = screen.getByPlaceholderText('Remember to...');
    fireEvent.change(input, { target: { value: mockTasks[0].description } });
    input = screen.getByDisplayValue(mockTasks[0].description);
    expect(input).toBeInTheDocument();
    
    //Creating new task 
    const addButton = screen.getByText('Add Note');
    fireEvent.click(addButton);

    //This is simulating creating a server call when the note is created
    mockQuery(getAllTasksByUser, mockTasks);

    // Wait for asynchronous operations, then make assertions
    await waitFor(() => {
   
      //Confirming Mock Task was added
      let newTask = screen.getByText(mockTasks[0].description)
      expect(newTask).toBeInTheDocument();

    });
  });


  // Test 2
  test('handles test task checkbox', async () => {
    const mockTasks = [
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

    //creating a fake server call to test 
    mockQuery(getAllTasksByUser, mockTasks);

     // Wait for asynchronous operations, then make assertions
    await waitFor(() => {
      // Assert that the checkbox is not checked
      expect(screen.getByRole("checkbox")).not.toBeChecked();
      const checkbox = screen.getByRole("checkbox");
      console.log(checkbox);
      fireEvent.click(checkbox)
      
      // Wait for state to update after clicking the checkbox
      waitFor(() => {
        expect(checkbox).toBeChecked();
      });
    });
  });
    
  
  //Test 3: Deleting Note
  test('handles deleting a task', async () => {
    // Render the component
    renderInContext(<DemoAppPage />);

    // Create mock tasks
    const mockTasks = [
      {
        id: "1",
        description: "Test todo 1",
        createdAt: new Date(),
        time: "4:20",
        isDone: false,
        userId: 1,
      }
    ];

    //creating a fake server call to test 
    mockQuery(getAllTasksByUser, mockTasks);

    // Wait for tasks to appear in the UI
    await waitFor(() => {
      expect(screen.getByText('Test todo 1')).toBeInTheDocument();
      
      // Simulate the deletion action (for example, clicking a delete button)
      const deleteButton = screen.getByTitle('Remove task')
      fireEvent.click(deleteButton);

      //wait for task to be deletde and check that it was deleted 
      waitFor(() => {
        expect(screen.queryByText('Test todo 1')).not.toBeInTheDocument();
      });   
  });


  });
})




 
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


