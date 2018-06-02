import { login } from './currentUser';

const TRY = 'detri-site/login/TRY';
const SUCCESS = 'detri-site/login/SUCCESS';
const FAIL = 'detri-site/login/FAIL';
const UPDATE_USERNAME = 'detri-site/login/UPDATE_USERNAME';
const UPDATE_PASSWORD = 'detri-site/login/UPDATE_PASSWORD';

const defaultState = {
  inProgress: false,
  success: false,
  username: '',
  password: ''
};

export function tryLogin(username, password) {
  return dispatch => {
    dispatch({ type: TRY });
    return fetch('/login', {
      method: 'POST',
      credentials: 'same-origin',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        if (json.ok) {
          dispatch(login(json.user));
          dispatch(loginSuccess());
        } else {
          dispatch(loginFail(json.error));
        }
      })
      .catch(err => {
        dispatch(loginFail(`Something went wrong. ${err}`));
      });
  };
}

export function loginSuccess() {
  return {
    type: SUCCESS
  };
}

export function loginFail(error) {
  return {
    type: FAIL,
    error
  };
}

export function updateUsername(username) {
  return {
    type: UPDATE_USERNAME,
    username
  };
}

export function updatePassword(password) {
  return {
    type: UPDATE_PASSWORD,
    password
  };
}

export default function reducer(state = defaultState, action = {}) {
  switch(action.type) {
    case TRY:
      return {
        ...state,
        inProgress: true
      };
    case SUCCESS:
      return {
        ...state,
        success: true
      };
    case FAIL:
      return {
        ...state,
        error: action.error,
        inProgress: false
      };
    case UPDATE_USERNAME:
      return {
        ...state,
        username: action.username
      };
    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.password
      };
    default:
      return defaultState;
  }
}