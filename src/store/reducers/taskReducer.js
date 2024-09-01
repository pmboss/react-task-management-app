// taskReducer.js
import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAIL,
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAIL,
    FETCH_TASK_BY_ID_REQUEST,
    FETCH_TASK_BY_ID_SUCCESS,
    FETCH_TASK_BY_ID_FAIL,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
} from '../actions/taskActionTypes';

const initialState = {
    tasks: [],
    task: null,
    loading: false,
    error: null,
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_REQUEST:
        case ADD_TASK_REQUEST:
        case FETCH_TASK_BY_ID_REQUEST:
        case UPDATE_TASK_REQUEST:
        case DELETE_TASK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.payload,
                error: null,
            };
        case ADD_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: [...state.tasks, action.payload],
                error: null,
            };
        case FETCH_TASK_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                task: action.payload,
                error: null,
            };
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: state.tasks.map(task =>
                    task.id === action.payload.id ? action.payload : task
                ),
                error: null,
            };
        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: state.tasks.filter(task => task.id !== action.payload),
                error: null,
            };
        case FETCH_TASKS_FAIL:
        case ADD_TASK_FAIL:
        case FETCH_TASK_BY_ID_FAIL:
        case UPDATE_TASK_FAIL:
        case DELETE_TASK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default taskReducer;
