import React, { useState, useEffect } from 'react';
import { signInWithGoogle } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/authActions';
import Loader from './loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth);
    const { user, loading } = useSelector(state => state.auth);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login(email, password));
            // const user = await login(email, password);
            // console.log("User logged in:", user);
            // console.log("User authstate in:", authState);
            // if (user && user.uid) {
            //     navigate('/profile');
            // }
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (user && user.uid) {
            navigate('/profile');
        }
    }, [user, navigate]);

    const handleGoogleSignIn = async () => {
        try {
            await dispatch(signInWithGoogle());
            // navigate("/profile");
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    return (
        <div className="relative flex justify-center items-center h-screen bg-gray-100">
            <Loader loading={loading} />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Log In</h2>
                <form onSubmit={handleLogin}>
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
                        <label className="block text-gray- text-left" htmlFor="password">Password</label>
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
                        Log In
                    </button>
                </form>
                <p className="text-gray-600 mt-4 text-center">
                    Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
                </p>
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                </div>
                <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center w-full px-4 py-2 font-semibold text-gray-700 bg-white border rounded hover:bg-gray-100"
                >
                    <svg

                        className="w-6 h-6 mr-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
                        <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>  Google Sign-In
                </button>
            </div>
        </div>
    );
};

export default Login;
