import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTaskById, updateTask } from '../store/actions/taskActions';
import { useDispatch, useSelector } from 'react-redux';
import TaskLoader from './task-loader';

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { task, loading, error } = useSelector(state => state.tasks);

  const [taskData, setTaskData] = useState({
    title: '',
    assignedTo: '',
    status: 'Open',
    priority: 'Low',
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    if (taskId) {
      dispatch(fetchTaskById(taskId));
    }
  }, [dispatch, taskId]);

  useEffect(() => {
    if (task) {
      setTaskData(task);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If the status is set to 'Done', set the end date to today
    if (taskData.status === 'Done') {
      taskData.endDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    }

    try {
      await dispatch(updateTask(taskId, taskData));
      navigate('/profile'); // Redirect back to profile after task update
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-10 rounded-lg shadow-lg">
      {loading && <TaskLoader loading={loading} />}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-left">Title</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-left">Assigned To</label>
          <input
            type="email"
            name="assignedTo"
            value={taskData.assignedTo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-left">Status</label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="Open">Open</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Under-review">Under-review</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-left">Priority</label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-left">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={taskData.startDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
