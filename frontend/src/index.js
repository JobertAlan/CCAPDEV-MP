import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Import contexts
import { GetAuthContext } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GetAuthContext> 
      <App />
    </GetAuthContext>
  </React.StrictMode>
);

