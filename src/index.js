import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import reducer from './redux/reducer';
import 'bootstrap/dist/css/bootstrap.css';
import {Provider} from 'react-redux'
import firebase from 'firebase';
import { config } from './firebase/config'

console.warn = console.error = () => {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
