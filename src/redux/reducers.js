import { combineReducers } from 'redux'
import loginReducer from './loginReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer
});

export default rootReducer;