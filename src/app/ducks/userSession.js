const LOGIN = 'detri-site/user/LOGIN';
const LOGOUT = 'detri-site/user/LOGOUT';

export function login(user) {
  return {
    type: LOGIN,
    user
  };
}

export function logout() {
  return {
    type: LOGOUT,
    user
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
