import { combineReducers } from 'redux';
import today from './today';
import month from './month';
import filter from './filter';

const rootReducer = combineReducers({
  today,
  month,
  filter
});

export default rootReducer;