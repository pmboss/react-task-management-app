import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers'; // This is where your root reducer will be imported

// Create the Redux store, applying thunk middleware and dev tools
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
