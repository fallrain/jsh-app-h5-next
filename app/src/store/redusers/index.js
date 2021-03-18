import {
  combineReducers
} from 'redux';
import appContent from './appContent.reducer';

export default combineReducers({
  app: appContent
});
