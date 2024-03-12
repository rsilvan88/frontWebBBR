import { createRoot } from 'react-dom/client'; 
import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import store from './store';

import './styles/globalStyles.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);