import { combineReducers } from 'redux';
import employees from './modules/employees';

const reducers = combineReducers({
    employees
});

export default reducers;