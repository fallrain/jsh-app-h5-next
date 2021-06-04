import {
  createStore,
  applyMiddleware,
  compose,
  Middleware
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './redusers';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const middleWares: Middleware[] = [
  thunk
];
const enhancer = composeEnhancers(
  applyMiddleware(...middleWares)
  // other store enhancers if any
);
const store = createStore(reducers, enhancer);
export default store;
