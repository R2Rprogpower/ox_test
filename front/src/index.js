import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

// Get the container where the app will render
const container = document.getElementById('root');

// Create a root for React to render onto
const root = createRoot(container);

// Render the app using createRoot's render method
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
