import React from 'react';
import ReactDOM from 'react-dom/client';
import $ from 'jquery';

import App from './App';

import './index.css';


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

