const TRY = 'detri-site/register/TRY';
const SUCCESS = 'detri-site/register/SUCCESS';
const FAIL = 'detri-site/register/FAIL';
const UPDATE_USERNAME = 'detri-site/register/UPDATE_USERNAME';
const UPDATE_PASSWORD = 'detri-site/register/UPDATE_PASSWORD';
const UPDATE_CONFIRM_PASSWORD = 'detri-site/register/UPDATE_CONFIRM_PASSWORD';
const UPDATE_EMAIL = 'detri-site/register/UPDATE_EMAIL';
const UPDATE_CONFIRM_EMAIL = 'detri-site/register/UPDATE_CONFIRM_EMAIL';

const defaultState = {
  inProgress: false,
  success: false,
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  confirmEmail: ''
};

export function tryRegister (username, password, email) {
  return dispatch => {
    dispatch({ type: TRY });
    return fetch('/user', {
      method: 'POST',
      credentials: 'same-origin',
      body: {
        username,
        password,
        email
      }
    })
      .then(res => {
        return res.json();
      }, err => {
        dispatch(registerFail(err));
      })
      .then(json => {
        if (json.ok) {
          dispatch(registerSuccess());
        } else {
          dispatch(registerFail('Could not create user.'));
        }
      }, err => {
        dispatch(registerFail('Response was likely not JSON.\n' + err));
      });
  };
}

export function registerSuccess() {
  return {
    type: SUCCESS
  };
}

export function registerFail(error) {
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

export function updateConfirmPassword(confirmPassword) {
  return {
    type: UPDATE_CONFIRM_PASSWORD,
    confirmPassword
  };
}

export function updateEmail(email) {
  return {
    type: UPDATE_EMAIL,
    email
  };
}

export function updateConfirmEmail(confirmEmail) {
  return {
    type: UPDATE_CONFIRM_EMAIL,
    confirmEmail
  }
}

export default function reducer (state = defaultState, action = {}) {
  switch (action.type) {
    case TRY:
      return {
        ...state,
        inProgress: true
      };
    case SUCCESS:
      return {
        ...state,
        inProgress: false,
        success: true
      };
    case FAIL:
      return {
        ...state,
        inProgress: false,
        error: action.error
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
    case UPDATE_CONFIRM_PASSWORD:
      return {
        ...state,
        confirm_password: action.confirmPassword
      };
    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.email
      };
    case UPDATE_CONFIRM_EMAIL:
      return {
        ...state,
        confirm_email: action.confirmEmail
      };
    default:
      return state;
  }
}
