import { auth, db } from '../../components/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    GOOGLE_LOGIN_REQUEST,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAIL
} from './authTypes';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';
// action to handle register user
export const register = (email, password, firstName, lastName) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'users', user.uid), {
            firstName,
            lastName,
            email,
            photoURL: user?.photoURL
        });
        dispatch({
            type: REGISTER_SUCCESS,
            payload: {
                uid: user.uid,
                email: user.email,
                firstName,
                lastName,
                displayName: `${firstName} ${lastName}`,
                photoURL: user?.photoURL,
            }
        });
        toast.success('Your profile added successfully!! 😊')

    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.message,
        });
        toast.error(`Error: ${error.message}`);
    }
};

// Action to handle login
export const login = (email, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        dispatch({
            type: LOGIN_SUCCESS,
            payload: {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
            }
        });
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.message,
        });
        toast.error(`Error: ${error.message}`);
    }
};

// Action to handle login with Google
const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = () => async (dispatch) => {
    dispatch({ type: GOOGLE_LOGIN_REQUEST });
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;
        if (user) {
            await setDoc(doc(db, 'users', user.uid), {
                firstName: user.displayName,
                lastName: '',
                email: user.email,
                photoURL: user.photoURL
            });
        }
        dispatch({
            type: GOOGLE_LOGIN_SUCCESS,
            payload: result
        });
        // toast.success(`Welcome, ${user.displayName}`)
    } catch (error) {
        dispatch({
            type: GOOGLE_LOGIN_FAIL,
            payload: error
        });
        toast.error(`Error: ${error.message}`);
    }
};

export const fetchUserProfile = (userId) => async (dispatch) => {
    dispatch({ type: 'USER_PROFILE_REQUEST' });
    try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
            console.log({ uid: userId, ...userDoc.data() })
            dispatch({
                type: 'USER_PROFILE_SUCCESS',
                payload: { uid: userId, ...userDoc.data() },
            });
            const userData = userDoc.data();
            toast.success(`Welcome, ${userData.firstName} ${userData.lastName}`)
        } else {
            dispatch({ type: 'USER_PROFILE_FAIL', payload: 'User not found' });
        }
    } catch (error) {
        dispatch({ type: 'USER_PROFILE_FAIL', payload: error.message });
        toast.error(`Error: ${error.message}`);
    }
};

export const monitorAuthState = () => (dispatch) => {
    onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
            dispatch(fetchUserProfile(currentUser.uid));
        } else {
            dispatch({ type: 'USER_PROFILE_FAIL', payload: 'No authenticated user found' });
        }
    });
};

// Action to handle logout
export const logout = () => async (dispatch) => {
    await signOut(auth);
    dispatch({ type: LOGOUT });
    toast.success('logged out successfully');
};
