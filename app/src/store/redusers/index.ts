import {
  combineReducers
} from 'redux';
import app from './app.reducer';
import user from '../user/user.reduser';

export default combineReducers({
  app,
  user,
});
