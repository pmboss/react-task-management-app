// taskActions.js
import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAIL,
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAIL,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    FETCH_TASK_BY_ID_REQUEST,
    FETCH_TASK_BY_ID_SUCCESS,
    FETCH_TASK_BY_ID_FAIL,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAIL
} from './taskActionTypes';
import { db, auth } from '../../components/firebase';
import { collection, addDoc, Timestamp, doc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

export const fetchTasks = () => async (dispatch) => {
    dispatch({ type: FETCH_TASKS_REQUEST });
    try {
        const user = auth.currentUser;
        const taskCollection = collection(db, 'tasks', user.uid, 'userTasks');
        const taskSnapshot = await getDocs(taskCollection);
        const taskList = taskSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        dispatch({
            type: FETCH_TASKS_SUCCESS,
            payload: taskList,
        });
    } catch (error) {
        dispatch({
            type: FETCH_TASKS_FAIL,
            payload: error.message,
        });
        toast.error(`Error: ${error.message}`);
    }
};

export const addTask = (task) => async (dispatch) => {
    dispatch({ type: ADD_TASK_REQUEST });
    try {
        const userId = auth.currentUser.uid;
        const taskRef = await addDoc(collection(db, 'tasks', userId, 'userTasks'), {
            ...task,
            createdBy: userId,
            createdAt: Timestamp.fromDate(new Date())
        });
        dispatch({
            type: ADD_TASK_SUCCESS,
            payload: { id: taskRef.id, ...task }
        });
        toast.success('Task added successfully')
    } catch (error) {
        dispatch({
            type: ADD_TASK_FAIL,
            payload: error.message,
        });
        toast.error(`Error: ${error.message}`);
    }
};


// Fetch task by ID
export const fetchTaskById = (taskId) => async (dispatch) => {
    dispatch({ type: FETCH_TASK_BY_ID_REQUEST });

    try {
        const userId = auth.currentUser.uid;
        const taskDoc = await getDoc(doc(db, 'tasks', userId, 'userTasks', taskId));

        if (taskDoc.exists()) {
            dispatch({
                type: FETCH_TASK_BY_ID_SUCCESS,
                payload: { id: taskId, ...taskDoc.data() }
            });
        } else {
            throw new Error('Task not found');
        }
    } catch (error) {
        dispatch({
            type: FETCH_TASK_BY_ID_FAIL,
            payload: error.message,
        });
        toast.error(`Error: ${error.message}`);
    }
};

// Update task
export const updateTask = (taskId, taskData) => async (dispatch) => {
    dispatch({ type: UPDATE_TASK_REQUEST });

    try {
        const userId = auth.currentUser.uid;
        const taskRef = doc(db, 'tasks', userId, 'userTasks', taskId);

        await updateDoc(taskRef, taskData);

        dispatch({
            type: UPDATE_TASK_SUCCESS,
            payload: { id: taskId, ...taskData }
        });
        toast.success('Task update successfully')

    } catch (error) {
        dispatch({
            type: UPDATE_TASK_FAIL,
            payload: error.message,
        });
        toast.error(`Error: ${error.message}`);
    }
};

// Delete task
export const deleteTask = (taskId) => async (dispatch) => {
    dispatch({ type: DELETE_TASK_REQUEST });
    try {
        const userId = auth.currentUser.uid;
        const taskRef = doc(db, 'tasks', userId, 'userTasks', taskId);

        const taskSnap = await getDoc(taskRef);

        if (!taskSnap.exists()) {
            throw new Error("Task not found.");
        }

        const taskData = taskSnap.data();

        if (taskData.createdBy !== userId) {
            throw new Error("You are not authorized to delete this task.");
        }

        await deleteDoc(taskRef);

        dispatch({
            type: DELETE_TASK_SUCCESS,
            payload: taskId,
        });

        toast.success('Task deleted successfully')
    } catch (error) {
        dispatch({
            type: DELETE_TASK_FAIL,
            payload: error.message,
        });
        toast.error(`Error: ${error.message}`);

    }
    //   console.error("Error deleting task: ", error.message);
    //   throw error;
}


