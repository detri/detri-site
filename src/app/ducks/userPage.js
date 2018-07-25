const USER_TRY = 'detri-site/userPage/USER_TRY';
const USER_SUCCESS = 'detri-site/userPage/USER_SUCCESS';
const USER_FAILURE = 'detri-site/userPage/USER_FAILURE';

const defaultState = {
  userStarted: false,
  user: null
};

export function tryUser(username) {
  return dispatch => {
    dispatch({ type: USER_TRY });
    fetch('/api/user/' + username)
      .then(res => res.json())
      .then(json => {
        if (json.ok) {
          dispatch(userSuccess(json.data));
          return;
        }
        dispatch(userFailure(json.error));
      })
      .catch(err => {
        dispatch(userFailure(err));
      });
  }
}

export function userSuccess(user) {
  return {
    type: USER_SUCCESS,
    user
  };
}

export function userFailure(error) {
  return {
    type: USER_FAILURE,
    error
  };
}

export default function reducer(state = defaultState, action = {}) {
  switch(action.type) {
    case USER_TRY:
      return {
        ...state,
        userStarted: true
      };
    case USER_SUCCESS:
      return {
        ...state,
        user: action.user
      };
    case USER_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}
