const ALL_USERS_TRY = 'detri-site/allUsers/ALL_USERS_TRY';
const ALL_USERS_SUCCESS = 'detri-site/allUsers/ALL_USERS_SUCCESS';
const ALL_USERS_FAIL = 'detri-site/allUsers/ALL_USERS_FAIL';

const defaultState = {
  users: [],
  usersStarted: false
}

export function tryAllUsers() {
  return dispatch => {
    dispatch({ type: ALL_USERS_TRY });
    fetch('/api/user')
      .then(res => res.json())
      .then(json => {
        if (json.ok) {
          dispatch(setAllUsers(json.data));
          return;
        }
        dispatch(failAllUsers(json.error));
      });
  }
}

export function setAllUsers(users) {
  return {
    type: ALL_USERS_SUCCESS,
    users
  };
}

export function failAllUsers(error) {
  return {
    type: ALL_USERS_SUCCESS,
    error
  }
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case ALL_USERS_TRY:
      return {
        ...state,
        usersStarted: true
      };
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        usersStarted: false,
        users: action.users
      };
    case ALL_USERS_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
