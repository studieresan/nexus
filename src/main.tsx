import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <HashRouter>
      <App />
    </HashRouter>,
  );
} else {
  console.error("Could not find the 'root' element.");
}