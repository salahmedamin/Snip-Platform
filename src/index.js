import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

/**
 * REDUX HERE
 */
import { Provider } from "react-redux";
import store from "./redux-data/store";

window.cnt = 0

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);