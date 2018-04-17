import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import register from './register.js';
import currentUser from './currentUser.js';

const rootReducer = combineReducers({
  register,
  currentUser
});

export default rootReducer;

export function configureStore () {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
}
