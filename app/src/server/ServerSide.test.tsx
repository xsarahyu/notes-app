import { describe, it, expect, vi } from 'vitest';
import { createTask } from './actions';

// Mock context object
const mockContext = {
    user: { id: 1 },
    entities: {
      Task: {
        create: vi.fn().mockImplementation(({ data }) => Promise.resolve({
          id: 1, // Assuming ID is always 1 for simplicity
          description: data.description, // Reflect the provided description
          user: { connect: { id: 1 } },
        })),
      },
    },
  };
  

describe('createTask', () => {
  it('creates a task successfully', async () => {
    const taskData = { description: 'Test task' }; //Adding a simple name to make sure it is created

    const result = await createTask(taskData, mockContext);

    expect(mockContext.entities.Task.create).toHaveBeenCalledWith({
      data: {
        description: taskData.description,
        user: { connect: { id: mockContext.user.id } },
      },
    });
    expect(result).toEqual({
      id: 1,
      description: 'Test task',
      user: { connect: { id: 1 } },
    });
  });
  it('creates a task with an empty description', async () => {
    const taskData = { description: '' }; // Intentionally providing an empty description
  
    const result = await createTask(taskData, mockContext);
  
    expect(mockContext.entities.Task.create).toHaveBeenCalledWith({
      data: {
        description: taskData.description,
        user: { connect: { id: mockContext.user.id } },
      },
    });
    expect(result).toEqual({
      id: 1,
      description: '', // Expecting the empty description to be reflected in the result
      user: { connect: { id: 1 } },
    });
  });
  
});
