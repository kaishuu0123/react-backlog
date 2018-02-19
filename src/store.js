import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

export const history = createHistory({
  basename: BASENAME
});

export const store = createStore(
    reducer,
    applyMiddleware(thunk, routerMiddleware(history))
);
