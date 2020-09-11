import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { modifySpotList, changeSearch, changeCurrentUser } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistedState = loadFromLocalStorage();

const rootReducer = combineReducers({modifySpotList, changeSearch, changeCurrentUser});
const store = createStore(rootReducer, persistedState, composeWithDevTools());

function saveToLocalStorage(state) {
  // try/catch if local storage in browser NA
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  // try/catch if local storage in browser NA
  try {
    const serializedState = localStorage.getItem('state');
    // return undefined instead of null becasue redux doe snot accept
    // null value
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

// everytime store changed, save state to local storage
store.subscribe(() => saveToLocalStorage(store.getState()))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
