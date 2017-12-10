import { combineReducers } from 'redux';
import today from './today';
import month from './month';

const rootReducer = combineReducers({
  today,
  month
});

export default rootReducer;