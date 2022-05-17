import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
/*
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // development URL
  axios.defaults.baseURL = `${process.env.REACT_APP_API_SERVER_DEVELOPMENT}`;
} else {
  // production URL
  axios.defaults.baseURL = `${process.env.REACT_APP_API_SERVER_PRODUCTION}`;
}
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
