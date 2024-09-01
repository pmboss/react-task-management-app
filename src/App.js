import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/register';
import Login from './components/login';
import Profile from './components/profile';
import { auth } from './components/firebase';
import TaskList from './components/task-list';
import AddTask from './components/add-task';
import EditTask from './components/edit-task';
import { useDispatch, useSelector } from 'react-redux';
import { monitorAuthState } from './store/actions/authActions';
import PrivateRoute from './components/gaurd-route';
import Loader from './components/loader';
import { Toaster } from 'react-hot-toast';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, authChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(monitorAuthState());
  }, [dispatch]);

  if (!authChecked) {
    return <Loader loading={true} />
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/profile" /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/profile" element={<Profile />} >
            <Route index element={<TaskList />} />
            <Route path="add-task" element={<AddTask />} />
            <Route path="edit-task/:taskId" element={<EditTask />} />
          </Route>
        </Routes>
        <Toaster position="top-right"
          duration="4000"
          reverseOrder={false} />
      </div>
    </Router>
  );
}

export default App;
