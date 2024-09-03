// App.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import App from './App';
import Loader from './components/loader';

const mockStore = configureStore([]);

test('renders Loader when authChecked is false', () => {
  const store = mockStore({
    auth: {
      isAuthenticated: false,
      authChecked: false,
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  expect(getByText(/loading/i)).toBeInTheDocument();
});

test('renders Login when not authenticated', () => {
  const store = mockStore({
    auth: {
      isAuthenticated: false,
      authChecked: true,
    },
  });

  const { getByText } = render(
    <Provider store={store}>
        <App />
    </Provider>
  );

  expect(getByText(/login/i)).toBeInTheDocument();
});
