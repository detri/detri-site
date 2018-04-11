import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import register from './register.js';
import userSession from './userSession.js';

const rootReducer = combineReducers({
  register,
  userSession
});

export default rootReducer;

export function configureStore () {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
}
