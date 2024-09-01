import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers'; // This is where your root reducer will be imported

// Create the Redux store, applying thunk middleware and dev tools
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
