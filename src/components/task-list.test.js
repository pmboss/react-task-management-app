import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import TaskList from './task-list';

import { deleteTask, fetchTasks } from '../store/actions/taskActions';

const mockStore = configureStore();

// Mock the fetchTasks and deleteTask actions
jest.mock('../store/actions/taskActions', () => ({
  fetchTasks: jest.fn(() => ({ type: 'FETCH_TASKS' })),
  deleteTask: jest.fn(() => ({ type: 'DELETE_TASK' })),
}));


jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('TaskList Component', () => {
  let store;

  beforeEach(() => {
    // Set up the initial state for the redux store
    store = mockStore({
      tasks: {
        tasks: [
          {
            id: 1,
            title: 'Task 1',
            assignedTo: 'User 1',
            status: 'Open',
            priority: 'High',
            startDate: '2023-09-01',
            endDate: null,
          },
          {
            id: 2,
            title: 'Task 2',
            assignedTo: 'User 2',
            status: 'In-Progress',
            priority: 'Medium',
            startDate: '2023-09-02',
            endDate: '2023-09-10',
          },
        ],
        loading: false,
        error: null,
      },
    });
  });

  test('renders the task list correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('displays a loading spinner when loading is true', () => {
    store = mockStore({
      tasks: {
        tasks: [],
        loading: true,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('displays a message when no tasks are available', () => {
    store = mockStore({
      tasks: {
        tasks: [],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/Please add your first task!/i)).toBeInTheDocument();
  });

  test('deletes a task when delete button is clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskList />
        </BrowserRouter>
      </Provider>
    );

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(deleteTask).toHaveBeenCalledWith(1);
  });

  test('sorts tasks by title', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TaskList />
        </BrowserRouter>
      </Provider>
    );

    const titleHeader = screen.getByText('Title');
    fireEvent.click(titleHeader);

    const tasks = screen.getAllByText(/Task/i);
    expect(tasks[0]).toHaveTextContent('Task 1');
    expect(tasks[1]).toHaveTextContent('Task 2');
  });
});
