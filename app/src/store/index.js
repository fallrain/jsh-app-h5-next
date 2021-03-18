import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import reducers from './redusers/index';

const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const middleWares = [
];
const enhancer = composeEnhancers(
  applyMiddleware(...middleWares),
  // other store enhancers if any
);
const store = createStore(reducers, enhancer);
export default store;
