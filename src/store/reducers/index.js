import { combineReducers } from 'redux';

// Import your reducers here (we'll create them later)
import taskReducer from './taskReducer';
import authReducer from './authReducer';

// Combine all reducers into a single root reducer
const rootReducer = combineReducers({
  tasks: taskReducer,
  auth: authReducer,
});

export default rootReducer;
