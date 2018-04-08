import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import register from './register.js';

const rootReducer = combineReducers({
  register
});

export default rootReducer;

export function configureStore () {
  return createStore(
    rootReducer,
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
