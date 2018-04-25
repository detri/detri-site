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
      }
    default:
      return defaultState;
  }
}