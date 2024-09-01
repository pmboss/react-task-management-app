import React, { useState } from 'react';
import { addTask } from '../store/actions/taskActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TaskLoader from './task-loader';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('Open');
  const [priority, setPriority] = useState('Low');
  const [startDate, setStartDate] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.tasks)
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      assignedTo,
      status,
      priority,
      startDate,
    };

    try {
      await dispatch(addTask(taskData));
      // alert('Task added successfully');
      navigate('/profile');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className='relative max-w-md mx-auto bg-white p-8 mt-10 rounded-lg shadow-lg'>
      {loading && <TaskLoader loading={loading}/>}
      <h2 className='text-2xl font-bold mb-6 text-gray-800'>Create a New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700 text-left mb-2' htmlFor='title'>Title</label>
          <input
            type='text'
            id='title'
            placeholder='Enter title name'
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-left mb-2' htmlFor='assignedTo'>Assigned To</label>
          <input
            type='email'
            id='assignedTo'
            placeholder='Enter assignee email address'
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-left mb-2' htmlFor='status'>Status</label>
          <select
            id='status'
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value='Open'>Open</option>
            <option value='In-Progress'>In-Progress</option>
            <option value='Under-review'>Under-review</option>
            <option value='Done'>Done</option>
          </select>
        </div>

        <div className='mb-4'>
          <label className='block text-gray-700 text-left mb-2' htmlFor='priority'>Priority</label>
          <select
            id='priority'
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value='Low'>Low</option>
            <option value='Medium'>Medium</option>
            <option value='High'>High</option>
          </select>
        </div>

        <div className='mb-6'>
          <label className='block text-gray-700 text-left mb-2' htmlFor='startDate'>Start Date</label>
          <input
            type='Date'
            id='startDate'
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
            value={startDate}
            max={today}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
