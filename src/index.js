import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reducerBurgerBulder from './store/reducers/burgerBuilder';
import reducerOrder from './store/reducers/order';
import reducerAuth from './store/reducers/auth';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
  burgerBuilder: reducerBurgerBulder,
  order: reducerOrder,
  auth: reducerAuth
});

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
