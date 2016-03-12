import 'semantic-ui-css/semantic.css';
import './styles/app.scss';

import { render } from 'react-dom';
import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import gridReducer from './reducers/GridReducers';

import App from './components/App';

const reducer = gridReducer;

const configureStore = (initialState) => {
  const store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('application')
);
