import { combineReducers } from 'redux';
import today from './today';
import month from './month';
import filter from './filter';
import login from './login';

const rootReducer = combineReducers({
  login,
  today,
  month,
  filter
});

export default rootReducer;