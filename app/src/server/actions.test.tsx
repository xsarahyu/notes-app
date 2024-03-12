import { describe, it, expect, vi } from 'vitest';
import { createTask, deleteTask, updateTask } from './actions';
import { HttpError } from 'wasp/server';
import { throwValidationError } from 'wasp/auth/validation';

vi.mock('openai', () => {
  // We need to mock for openai or you will run into a issue w/ browswer ui for vitest
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
      delete: vi.fn().mockResolvedValue({
        id: 1, // Assuming the delete operation returns the id of the deleted task as confirmation
      }),
      update: vi.fn().mockImplementation(({ where, data }) => Promise.resolve({
        id: where.id,
        ...data,
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
  it('throws an authorization error when user is not present in context', async () => {
    expect.assertions(2); // Ensure that this is updated to match the number of assertions within the test
    
    const taskData = { description: 'Unauthorized task creation attempt' };
    const mockUnauthorizedContext: any = {}; // Context without a user
    
    try {
      await createTask(taskData, mockUnauthorizedContext);
    } catch (error: any) {
      // This should now correctly be asserting that two conditions must be met
      expect(error).toBeInstanceOf(HttpError);
      expect(error.statusCode).toBe(401);
    }
  });
});

describe('deleteTask', () => {
  it('deletes a task successfully', async () => {
    const taskId = '1'; // Assuming a task ID that exists
    await deleteTask({ id: taskId }, mockContext);

    expect(mockContext.entities.Task.delete).toHaveBeenCalledWith({
      where: { id: taskId },
    });
  });
  it('throws an authorization error when user is not present in context', async () => {
    expect.assertions(2);
    
    const mockUnauthorizedContext: any = {}; // Context without a user
    const taskId = '1';
    
    try {
      await deleteTask({ id: taskId }, mockUnauthorizedContext);
    } catch (error: any) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.statusCode).toBe(401);
    }
  });
});

describe('updateTask', () => {
  it('updates a task successfully', async () => {
    const taskId = '1';
    // Align test data with what updateTask actually uses
    const updateData = { isDone: true, time: undefined };

    const result = await updateTask({ id: taskId, ...updateData }, mockContext);

    expect(mockContext.entities.Task.update).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: taskId },
      data: expect.objectContaining(updateData),
    }));    
    // Adjust expected result to match what the function does and returns
    expect(result).toEqual({ id: taskId, ...updateData });
  });
  it('throws an authorization error when the user is not present in context', async () => {
    expect.assertions(2); // There are two assertions to be called within this block
  
    const mockUnauthorizedContext: any = {}; // Context without a user
    const taskId = '1';
    const updateData = { isDone: true, time: undefined };
  
    try {
      await updateTask({ id: taskId, ...updateData }, mockUnauthorizedContext);
    } catch (error: any) {
      expect(error).toBeInstanceOf(HttpError);
      expect(error.statusCode).toBe(401);
    }
  });
});


