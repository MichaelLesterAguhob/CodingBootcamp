import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'notyf/notyf.min.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const name  = 'Jhon Smith'
// const element = <h1>Hello, {name}</h1>;

// root.render(element);
