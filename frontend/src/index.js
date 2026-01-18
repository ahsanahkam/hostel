/**
 * Index.js - Entry Point
 * ======================
 * 
 * This is the first file that runs when the app starts
 * It renders the App component into the HTML
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
