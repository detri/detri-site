const LOGIN = 'detri-site/currentUser/LOGIN';
const LOGOUT = 'detri-site/currentUser/LOGOUT';

export function login(user) {
  return {
    type: LOGIN,
    user
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...action.user
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
