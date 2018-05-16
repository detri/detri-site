const NEW_SONGS_TRY = 'detri-site/songs/NEW_SONGS_TRY';
const NEW_SONGS_SUCCESS = 'detri-site/songs/NEW_SONGS_SUCCESS';
const NEW_SONGS_FAIL = 'detri-site/songs/NEW_SONGS_FAIL';

const defaultState = {
  newSongs: [],
  newStarted: false
}

export function tryNewSongs() {
  return dispatch => {
    dispatch({ type: NEW_SONGS_TRY });
    fetch('/api/song/new')
      .then(res => res.json())
      .then(json => {
        if (json.ok) {
          console.log(json);
          dispatch(setNewSongs(json.data));
          return;
        }
        dispatch(failNewSongs(json.error));
      });
  }
}

export function setNewSongs(songs) {
  return {
    type: NEW_SONGS_SUCCESS,
    songs
  };
}

export function failNewSongs(error) {
  return {
    type: NEW_SONGS_FAIL,
    error
  };
}

export default function reducer(state = defaultState, action = {}) {
  switch (action.type) {
    case NEW_SONGS_TRY:
      return {
        ...state,
        newStarted: true
      };
    case NEW_SONGS_SUCCESS:
      return {
        ...state,
        newSongs: action.songs
      };
    case NEW_SONGS_FAIL:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}
