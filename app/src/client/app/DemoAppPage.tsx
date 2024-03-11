import { type Task } from 'wasp/entities';

import {
  deleteTask,
  updateTask,
  createTask,
  useQuery,
  getAllTasksByUser,
} from 'wasp/client/operations';

import { useState } from 'react';
import { TiDelete } from 'react-icons/ti';

export default function DemoAppPage() {
  return (
    <div className='py-10 lg:mt-10'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-4xl text-center'>
          <h2 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white'>
            <span className='text-yellow-500'>Notes</span> App
          </h2>
        </div>
        <div className='my-8 border rounded-3xl border-gray-900/10 dark:border-gray-100/10'>
          <div className='sm:w-[90%] md:w-[70%] lg:w-[50%] py-10 px-6 mx-auto my-8 space-y-10'>
            <NewTaskForm handleCreateTask={createTask} />
          </div>
        </div>
      </div>
    </div>
  );
}

type TodoProps = Pick<Task, 'id' | 'isDone' | 'description'>;

function Todo({ id, isDone, description }: TodoProps) {
  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await updateTask({
      id,
      isDone: e.currentTarget.checked,
    });
  };

  const handleDeleteClick = async () => {
    await deleteTask({ id });
  };

  return (
    <div className='flex items-center justify-between bg-purple-50 rounded-lg border border-gray-200 p-2 w-full'>
      <div className='flex items-center justify-between gap-5 w-full'>
        <div className='flex items-center gap-3'>
          <input
            type='checkbox'
            className='ml-1 form-checkbox bg-purple-300 checked:bg-purple-300 rounded border-purple-400 duration-200 ease-in-out hover:bg-purple-400 hover:checked:bg-purple-600 focus:ring focus:ring-purple-300 focus:checked:bg-purple-400 focus:ring-opacity-50 text-black'
            checked={isDone}
            onChange={handleCheckboxChange}
          />
          <span className={`text-slate-600 ${isDone ? 'line-through text-slate-500' : ''}`}>{description}</span>
        </div>
      </div>
      <div className='flex items-center justify-end w-15'>
        <button className='p-1' onClick={handleDeleteClick} title='Remove task'>
          <TiDelete size='20' className='text-red-600 hover:text-red-700' />
        </button>
      </div>
    </div>
  );
}

function NewTaskForm({ handleCreateTask }: { handleCreateTask: typeof createTask }) {
  const [description, setDescription] = useState<string>('');
  const { data: tasks, isLoading: isTasksLoading } = useQuery(getAllTasksByUser);

  const handleSubmit = async () => {
    try {
      await handleCreateTask({ description });
      setDescription('');
    } catch (err: any) {
      window.alert('Error: ' + (err.message || 'Something went wrong'));
    }
  };

  return (
    <div className='flex flex-col justify-center gap-10'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center justify-between gap-3'>
          <input
            type='text'
            id='description'
            className='text-sm text-gray-600 w-full rounded-md border border-gray-200 bg-[#f5f0ff] shadow-md focus:outline-none focus:border-transparent focus:shadow-none duration-200 ease-in-out hover:shadow-none'
            placeholder='Remember to...'
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          <button
            type='button'
            onClick={handleSubmit}
            className='min-w-[7rem] font-medium text-gray-800/90 bg-yellow-50 shadow-md ring-1 ring-inset ring-slate-200 py-2 px-4 rounded-md hover:bg-yellow-100 duration-200 ease-in-out focus:outline-none focus:shadow-none hover:shadow-none'
          >
            Add Note
          </button>
        </div>
      </div>

      <div className='space-y-10 col-span-full'>
        {isTasksLoading && <div>Loading...</div>}
        {tasks!! && tasks.length > 0 ? (
          <div className='space-y-4'>
            {tasks.map((task: Task) => (
              <Todo key={task.id} id={task.id} isDone={task.isDone} description={task.description} />
            ))}
          </div>
        ) : (
          <div className='text-gray-600 text-center'>Add notes to begin</div>
        )}
      </div>
    </div>
  );
}