import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import register from './register.js';
import currentUser, { login as loginUser } from './currentUser.js';
import login from './login.js';
import upload from './upload.js';
import songs from './songs.js';
import musicPlayer from './musicPlayer.js';
import allUsers from './allUsers.js';

const rootReducer = combineReducers({
  register,
  login,
  currentUser,
  upload,
  songs,
  musicPlayer,
  allUsers
});

export default rootReducer;

export function configureStore () {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  // initial auth check
  fetch('/authcheck', {
    credentials: 'include'
  })
    .then(res => res.json())
    .then(json => {
      if (json.ok) {
        store.dispatch(loginUser(json.user));
      }
    });
  return store;
}
