import { describe, it, expect, vi } from 'vitest';
import { createTask } from './actions';

vi.mock('openai', () => {
  // Mock the default export as a constructor function
  return {
    default: vi.fn().mockImplementation(() => ({
      createCompletion: vi.fn().mockResolvedValue({
        data: {
          choices: [{ text: 'Mocked completion text' }],
        },
      }),
    })),
  };
});

// Mock context object
const mockContext: any = {
  user: { id: 1 },
  entities: {
    Task: {
      create: vi.fn().mockImplementation(({ data }) => Promise.resolve({
        id: 1,
        description: data.description,
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
