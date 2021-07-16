import { configureStore } from '@reduxjs/toolkit';
import reducers from './redusers';

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }
const store = configureStore({
  reducer: reducers,
});

export default store;
