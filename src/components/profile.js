// Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';
import { Link, Outlet } from 'react-router-dom';
import Navbar from './navbar';
import { useDispatch, useSelector } from 'react-redux';
import { monitorAuthState } from '../store/actions/authActions';
// import { onAuthStateChanged } from 'firebase/auth';

import Loader from './loader';

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  // const [authChecked, setAuthChecked] = useState(false); // New state to track if auth check is complete
  const { user, loading, isAuthenticated, authChecked } = useSelector((state) => state.auth);

  const normalizedPathname = location.pathname.replace(/\/+$/, '');
  const showAddTaskButton = normalizedPathname === '/profile' || normalizedPathname === '/profile/task-list';
  const showBackButton = normalizedPathname === '/profile/add-task' || normalizedPathname.includes('/profile/edit-task');

  //   useEffect(() => {
  //     console.log(user)
  //     if(!isAuthenticated){
  //       dispatch(monitorAuthState());
  //     }
  // }, [dispatch]);

  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      navigate('/login');
    }
  }, [authChecked, isAuthenticated, navigate]);


  useEffect(() => {
    if (user && user.uid) {
      setUserProfile(user)
    }
  }, [user]);

  if (loading || !authChecked) {
    return <Loader loading={loading} />;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar user={userProfile} />
      <div className="max-w-7xl mx-auto p-8">
        <div className={`flex items-center mb-6 ${showAddTaskButton ? 'justify-between' : 'justify-end'}`}>
          {showAddTaskButton && <h1 className="text-3xl font-bold">Welcome to your Profile</h1>}
          {showAddTaskButton && (<Link
            to="add-task"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add Task
          </Link>
          )}
          {showBackButton && (
            <Link
              to='/profile'
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300">
              Back to Tasks
            </Link>
          )}
        </div>
        {/* Render the child components */}
        <Outlet />
      </div>
    </>
  );
};

export default Profile;
