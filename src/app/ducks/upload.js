const TRY = 'detri-site/upload/TRY';
const SUCCESS = 'detri-site/upload/SUCCESS';
const FAIL = 'detri-site/upload/FAIL';
const UPDATE_TITLE = 'detri-site/upload/UPDATE_TITLE';

const defaultState = {
  inProgress: false,
  success: false,
  title: ''
};

export function tryUpload(title, file) {
  return dispatch => {
    dispatch({ type: TRY });
    
  };
}

export function uploadSuccess() {
  return {
    type: SUCCESS
  };
}

export function uploadFail(error) {
  return {
    type: FAIL,
    error
  };
}

export function updateTitle(title) {
  return {
    type: UPDATE_TITLE,
    title
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
        inProgress: false,
        error: action.error
      };
    case UPDATE_TITLE:
      return {
        ...state,
        title: action.title
      };
    default:
      return defaultState;
  }
}