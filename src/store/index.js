import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import rootReducer from '../reducers/index';
import rootSaga from '../sagas';
import socketMiddleWare from '../middlewares/socket';

const sagaMiddleware = createSagaMiddleware();
export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [sagaMiddleware, routerMiddleware(history), socketMiddleWare];

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-underscore-dangle
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

export default createStore(
  rootReducer(history),
  initialState,
  composedEnhancers,
);

sagaMiddleware.run(rootSaga);
