import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTask } from '../store/actions/taskActions';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../store/actions/taskActions';
// import { FiPlus } from 'react-icons/fi'; // Import the plus icon from react-icons
import TaskLoader from './task-loader';
import { addTaskImg } from '../assets/images/add_task_img';
import Loader from './loader';

const TaskList = () => {
  const [taskList, setTaskList] = useState([]);
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState('startDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const addTaskImage = addTaskImg;

  useEffect(() => {
    const getTaskList = async () => {
      try {
        await dispatch(fetchTasks());
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };

    getTaskList();
  }, [dispatch]);

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      try {
        await dispatch(deleteTask(taskId));
        // setTaskList(taskList.filter(task => task.id !== taskId)); // Remove deleted task from list
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };



  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  let sortedTasks = [];
  if (taskList && taskList.length) {
    sortedTasks = [...taskList]?.sort((a, b) => {
      if (sortColumn === 'startDate' || sortColumn === 'endDate') {
        // Sorting by dates
        const dateA = new Date(a[sortColumn]) || 0;
        const dateB = new Date(b[sortColumn]) || 0;
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      } else {
        // Sorting by string fields
        const valueA = a[sortColumn]?.toString().toLowerCase();
        const valueB = b[sortColumn]?.toString().toLowerCase();
        if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      }
    });
  }

  const getSortIndicator = (column) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? ' ▲' : ' ▼';
    }
    return '';
  };

  return (
    <div className="overflow-x-auto">
      {loading && (
        <div className="flex items-center justify-center h-64">
          <TaskLoader loading={loading} />
        </div>
      )}

      {!loading && sortedTasks.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64">
          <div className="flex items-center justify-center cursor-pointer"
            onClick={() => navigate('/profile/add-task')}>
            {/* <FiPlus size={32} /> */}
            <img src={addTaskImage} />
          </div>
          <p className="mt-4 text-3xl text-gray-600 ">Please add your first task!</p>
        </div>
      )}

      {!loading && sortedTasks.length > 0 && (
        <table className="min-w-full bg-white border border-gray-200">
          <thead className='bg-slate-100 h-12'>
            <tr>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort('title')}
              >
                Title{getSortIndicator('title')}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort('assignedTo')}
              >
                Assigned To{getSortIndicator('assignedTo')}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort('status')}
              >
                Status{getSortIndicator('status')}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort('priority')}
              >
                Priority{getSortIndicator('priority')}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort('startDate')}
              >
                Start Date{getSortIndicator('startDate')}
              </th>
              <th
                className="py-2 px-4 border-b cursor-pointer"
                onClick={() => handleSort('endDate')}
              >
                End Date{getSortIndicator('endDate')}
              </th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks && sortedTasks.map((task) => (
              <tr key={task.id} className='h-16'>
                <td className="py-2 px-4 border-b">{task.title}</td>
                <td className="py-2 px-4 border-b">{task.assignedTo}</td>
                <td className={`py-2 px-4 border-b`}>
                  <span className={`px-3 w-32 inline-block py-1 rounded-full text-white ${getStatusClass(task.status)}`}>
                    {task.status}
                  </span>
                </td>
                <td className={`py-2 px-4 border-b`}>
                  <span className={`px-4 w-24 py-1 inline-block rounded-full text-white ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">{task.startDate}</td>
                <td className="py-2 px-4 border-b">{task?.endDate || ''}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    disabled={task.endDate}
                    onClick={() => navigate(`/profile/edit-task/${task.id}`)}
                    className={`py-1 px-3 rounded-lg mr-2 transition duration-300 ${task.endDate
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                      : 'bg-yellow-500 text-white hover:bg-yellow-600 cursor-pointer'
                      }`} >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const getStatusClass = (status) => {
  switch (status) {
    case 'Open':
      return 'bg-sky-500';
    case 'In-Progress':
      return 'bg-orange-400';
    case 'Under-review':
      return 'bg-fuchsia-500';
    case 'Done':
      return 'bg-emerald-500';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const getPriorityClass = (priority) => {
  switch (priority) {
    case 'Low':
      return 'bg-green-400';
    case 'Medium':
      return 'bg-orange-400';
    case 'High':
      return 'bg-red-500';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};


export default TaskList;
