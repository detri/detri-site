import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import register from './register.js';
import currentUser, { login as loginUser } from './currentUser.js';
import login from './login.js';
import upload from './upload.js';

const rootReducer = combineReducers({
  register,
  login,
  currentUser,
  upload
});

export default rootReducer;

export function configureStore () {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  // initial auth check
  fetch('/authcheck')
    .then(res => res.json())
    .then(json => {
      if (json.ok) {
        store.dispatch(loginUser(json.user));
      }
    });
  return store;
}
