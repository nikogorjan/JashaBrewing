import { combineReducers } from 'redux';
import cartReducer from './reducers';

const rootReducer = combineReducers({
  cart: cartReducer,
  // Add more reducers if needed
});

export default rootReducer;