import React, { useState } from 'react';
import { signup } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/actions/authActions';
import Loader from './loader';
const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading  } = useSelector(state => state.auth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const user = await signup(email, password);
            await dispatch(register(email, password, firstName, lastName))
            navigate('/profile');
        } catch (error) {
            console.error('Error signing up:', error.message);
        }
    };

    return (
        <div className="relative flex justify-center items-center h-screen bg-gray-100">
            <Loader loading={loading}/>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-left" htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-left" htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-left" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 text-left" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-gray-600 mt-4 text-center">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
